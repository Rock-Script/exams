const Router = require('express').Router();
const RouteTool = require('./template/tools/route.tool');

RouteTool.setRouter(Router);
RouteTool.addRoutes(require('./components/courses/course.routes'));
RouteTool.addRoutes(require('./components/exams/exam.routes'));
RouteTool.addRoutes(require('./components/questions/question.routes'));
RouteTool.addRoutes(require('./components/exam_logs/exam_log.routes'));

module.exports = Router;