const CourseController = require('./course.controller');
const CourseSchema = require('./course.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = 'courses';
const routes = [
    {
        path: `/${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: CourseSchema.POST_COURSE
        },
        handler: CourseController.postCourse
    },
    {
        path: `/${path}`,
        method: ROUTE_METHODS.GET,
        validation: {
            query: CourseSchema.GET_COURSES
        },
        handler: CourseController.getCourses
    },
    {
        path: `/${path}/:course_id`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            body: CourseSchema.RESET_USER_PASSWORD
        },
        handler: CourseController.patchCourse
    },
    {
        path: `/${path}/:course_id`,
        method: ROUTE_METHODS.GET,
        validation: {
            params: CourseSchema.GET_COURSE
        },
        handler: CourseController.getCourse
    }
]

module.exports = routes;