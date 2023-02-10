const ExamLogService = require('./exam_log.service');

module.exports.postExamLog = async (req, res, next) => {
    const data = await ExamLogService.addExamLog(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created exam log'
    }
}