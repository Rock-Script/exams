const Router = require('express').Router();
const RouteTool = require('./template/tools/route.tool');

RouteTool.setRouter(Router);
RouteTool.addRoutes(require('./components/courses/course.routes'));
RouteTool.addRoutes(require('./components/exams/exam.routes'));
RouteTool.addRoutes(require('./components/questions/question.routes'));

module.exports = Router;