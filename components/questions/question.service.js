const _ = require('lodash');
const QuestionModel = require('./question.model');
const ExamModel = require('../exams/exam.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const Reference = require('../../template/tools/reference-tool');
const QUESTION_TYPES = require('../../template/contants/question-types');

const verifyParams = async (exam_id, params) => {
    if (!exam_id) throw HTTP_RESPONSES.NOT_FOUND('exam id', exam_id);

    if (exam_id) {
        params.exam = await Reference.getExam(exam_id);
        if (!params.exam) throw HTTP_RESPONSES.NOT_FOUND('exam id', exam_id);
    }

    if (params.course_id) {
        params.course = await Reference.getCourse(params.course_id);
        if (!params.course) throw HTTP_RESPONSES.NOT_FOUND('course', params.course_id);
    }

    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    if (params.answer) {
        if ([QUESTION_TYPES.SINGLE_SELECT, QUESTION_TYPES.TEXT].includes(params.type) && !_.isString(params.answer)) {
            throw HTTP_RESPONSES.BAD_REQUEST('Answer should be text');
        }
        if (params.type === QUESTION_TYPES.NUMBER) {
            params.answer = +params.answer;
            if (_.isNaN(params.answer)) {
                throw HTTP_RESPONSES.BAD_REQUEST('Answer should be number');
            }
        }
        if (params.type === QUESTION_TYPES.MULTI_SELECT && !_.isArray(params.answer)) {
            throw HTTP_RESPONSES.BAD_REQUEST('Answer should be an array');
        }
    }

    return params;
}


module.exports.addQuestion = async(exam_id, params) => {
    params = await verifyParams(exam_id, params);
    const insert_response = await QuestionModel.insertQuestion(exam_id, params);
    await ExamModel.updateWeightage(exam_id);
    return insert_response;
}

module.exports.updateQuestion = async(exam_id, _id, params) => {
    const exam = await ExamModel.getExam(exam_id);
    if (!exam) {
        throw HTTP_RESPONSES.NOT_FOUND('exam', exam_id);
    }
    const question_index = exam.questions.findIndex(q => q._id?.toString() === _id);
    if (question_index === -1) {
        throw HTTP_RESPONSES.NOT_FOUND('question', _id);
    }

    const update_response = await QuestionModel.updateQuestion(exam._id, question_index, params);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    await ExamModel.updateWeightage(exam_id);
    return params;
}

module.exports.deleteQuestion = async(exam_id, _id) => {
    const exam = await ExamModel.getExam(exam_id);
    if (!exam) {
        throw HTTP_RESPONSES.NOT_FOUND('exam', exam_id);
    }
    const question_index = exam.questions.findIndex(q => q._id?.toString() === _id);
    if (question_index === -1) {
        throw HTTP_RESPONSES.NOT_FOUND('question', _id);
    }

    const update_response = await QuestionModel.deleteQuestion(exam._id, exam.questions[question_index]._id);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    await ExamModel.updateWeightage(exam_id);
    return this.getQuestion(exam._id);
}
