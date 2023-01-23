const CourseService = require('./course.service');

module.exports.postCourse = async (req, res, next) => {
    const data = await CourseService.addCourse(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created course'
    }
}

module.exports.getCourse = async (req, res, next) => {
    const data = await CourseService.getCourse(req.params.course_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved course'
    }
}

module.exports.getCourses = async (req, res, next) => {
    const data = await CourseService.getCourses(req.query);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved courses'
    }
}


module.exports.patchCourse = async (req, res, next) => {
    const data = await CourseService.updateCourse(req.params.course_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully created course'
    }
}