const ExamService = require('./exam.service');

module.exports.postExam = async (req, res, next) => {
    const data = await ExamService.addExam(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created exam'
    }
}

module.exports.getExam = async (req, res, next) => {
    const data = await ExamService.getExam(req.params.exam_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved exam'
    }
}

module.exports.getExams = async (req, res, next) => {
    const data = await ExamService.getExams(req.query);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved exams'
    }
}


module.exports.patchExam = async (req, res, next) => {
    const data = await ExamService.updateExam(req.params.exam_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully created exam'
    }
}