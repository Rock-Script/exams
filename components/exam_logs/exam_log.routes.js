const ExamLogController = require('./exam_log.controller');
const ExamLogSchema = require('./exam_log.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = 'exam_logs';
const routes = [
    {
        path: `/${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: ExamLogSchema.POST_EXAM_LOG
        },
        handler: ExamLogController.postExamLog
    },
    {
        path: `/${path}`,
        method: ROUTE_METHODS.GET,
        validation: {
            query: ExamLogSchema.GET_EXAM_LOG_LIST
        },
        handler: ExamLogController.getList
    },
    {
        path: `/${path}/:exam_log_id`,
        method: ROUTE_METHODS.GET,
        validation: {
            params: ExamLogSchema.GET_EXAM_LOG
        },
        handler: ExamLogController.getExamLog
    },
    {
        path: `/${path}/submit/:exam_log_id`,
        method: ROUTE_METHODS.POST,
        validation: {
            params: ExamLogSchema.SUBMIT_EXAM_LOG_PARAMS
        },
        handler: ExamLogController.submitExamLog
    },
    {
        path: `/${path}/:exam_log_id/:question_id`,
        method: ROUTE_METHODS.POST,
        validation: {
            params: ExamLogSchema.POST_EXAM_LOG_QUESTION_ANSWER_PARAMS,
            body: ExamLogSchema.POST_EXAM_LOG_QUESTION_ANSWER_BODY
        },
        handler: ExamLogController.postAnswer
    }
]

module.exports = routes;