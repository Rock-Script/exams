const ExamModel = require('./exam.model');
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

    return params;
}


module.exports.addExam = async(params) => {
    params = await verifyParams(params);
    const insert_response = await ExamModel.insertExam(params);
    return this.getExam(insert_response?.insertedId);
}

module.exports.updateExam = async(_id, params) => {
    const exam = await ExamModel.getExam(_id);
    if (!exam) {
        throw HTTP_RESPONSES.NOT_FOUND('exam', _id);
    }
    const update_response = await ExamModel.updateExam(exam._id, params);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    return this.getExam(exam._id);
}

module.exports.getExam = async(_id) => {
    if (!_id) return null;
    const exam = await ExamModel.getExam(_id);
    return exam;
}

module.exports.getExams = async(filter) => {
    const exams = await ExamModel.filter(filter);
    return exams;
}