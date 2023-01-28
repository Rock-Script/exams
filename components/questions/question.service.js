const QuestionModel = require('./question.model');
const ExamModel = require('../exams/exam.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const Reference = require('../../template/tools/reference-tool');

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

    return params;
}


module.exports.addQuestion = async(exam_id, params) => {
    params = await verifyParams(exam_id, params);
    const insert_response = await QuestionModel.insertQuestion(exam_id, params);
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
    return this.getQuestion(exam._id);
}

module.exports.getQuestion = async(_id) => {
    if (!_id) return null;
    const question = await QuestionModel.getQuestion(_id);
    return question;
}

module.exports.getQuestions = async(filter) => {
    const questions = await QuestionModel.filter(filter);
    return questions;
}