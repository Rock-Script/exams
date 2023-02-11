const QuestionController = require('./question.controller');
const QuestionSchema = require('./question.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = 'questions';
const routes = [
    {
        path: `/${path}/:exam_id`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: QuestionSchema.POST_QUESTION,
            params: QuestionSchema.POST_QUESTION_PARAMS
        },
        handler: QuestionController.postQuestion
    },
    {
        path: `/${path}/:exam_id/:question_id`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            params: QuestionSchema.PATCH_QUESTION_PARAMS,
            body: QuestionSchema.PATCH_QUESTION
        },
        handler: QuestionController.patchQuestion
    },
    {
        path: `/${path}/:exam_id/:question_id`,
        method: ROUTE_METHODS.DELETE,
        validation: {
            params: QuestionSchema.DELETE_QUESTION_PARAMS
        },
        handler: QuestionController.deleteQuestion
    }
]

module.exports = routes;