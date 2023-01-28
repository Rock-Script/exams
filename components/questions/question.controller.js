const QuestionService = require('./question.service');

module.exports.postQuestion = async (req, res, next) => {
    const exam_id = req.params.exam_id;
    const data = await QuestionService.addQuestion(exam_id, req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created question'
    }
}

module.exports.getQuestion = async (req, res, next) => {
    const data = await QuestionService.getQuestion(req.params.question_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved question'
    }
}

module.exports.getQuestions = async (req, res, next) => {
    const data = await QuestionService.getQuestions(req.query);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved questions'
    }
}


module.exports.patchQuestion = async (req, res, next) => {
    const data = await QuestionService.updateQuestion(req.params.exam_id, req.params.question_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully updated question'
    }
}


module.exports.deleteQuestion = async (req, res, next) => {
    const data = await QuestionService.deleteQuestion(req.params.exam_id, req.params.question_id);
    return {
        status: 200,
        data,
        message: 'Successfully delete question'
    }
} 