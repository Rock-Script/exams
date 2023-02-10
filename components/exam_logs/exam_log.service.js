const ExamLogModel = require('./exam_log.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const Reference = require('../../template/tools/reference-tool');

const verifyParams = async (params) => {
    if (params.course_id) {
        params.course = await Reference.getCourse(params.course_id);
        if (!params.course) throw HTTP_RESPONSES.NOT_FOUND('course', params.course_id);
    }

    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    if (params.exam_id) {
        params.exam = await Reference.getExam(params.exam_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('exam', params.exam);
    }
    return params;
}

module.exports.addExamLog = async(params) => {
    params = await verifyParams(params);
    params = {
        ...params,
        questions: params.exam.published_questions
    }
    const insert_response = await ExamLogModel.insertExamLog(params);
    return this.getExamLog(insert_response?.insertedId);
}

module.exports.getExamLog = async(_id) => {
    if (!_id) return null;
    const exam = await ExamLogModel.getExamLog(_id);
    return exam;
}