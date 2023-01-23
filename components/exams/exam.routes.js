const ExamController = require('./exam.controller');
const ExamSchema = require('./exam.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = 'exams';
const routes = [
    {
        path: `/${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: ExamSchema.POST_EXAM
        },
        handler: ExamController.postExam
    },
    {
        path: `/${path}`,
        method: ROUTE_METHODS.GET,
        validation: {
            query: ExamSchema.GET_EXAMS
        },
        handler: ExamController.getExams
    },
    {
        path: `/${path}/:exam_id`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            body: ExamSchema.RESET_USER_PASSWORD
        },
        handler: ExamController.patchExam
    },
    {
        path: `/${path}/:exam_id`,
        method: ROUTE_METHODS.GET,
        validation: {
            params: ExamSchema.GET_EXAM
        },
        handler: ExamController.getExam
    }
]

module.exports = routes;