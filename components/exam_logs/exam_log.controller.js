const ExamLogService = require('./exam_log.service');

module.exports.postExamLog = async (req, res, next) => {
    const data = await ExamLogService.addExamLog(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created exam log'
    }
}

module.exports.getExamLog = async(req, res, next) => {
    const data = await ExamLogService.getExamLog(req.params.exam_log_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved exam log'
    }
}

module.exports.postAnswer = async(req, res, next) => {
    const data = await ExamLogService.saveAnswer(req.params.exam_log_id, req.params.question_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully saved answer'
    }
}