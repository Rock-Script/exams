const CourseModel = require('./course.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const Reference = require('../../template/tools/reference-tool');


const getTreeView = (list) => {
    if (!list || list.length === 0) return [];
    const level_1 = list.filter(item => !item.parent_id);
    level_1.forEach(item => {
        buildTree(item, list);
    });
    return level_1;
}

const buildTree = (item, list) => { 
    if (!item || !list || list.length === 0) return;
    item.children = list.filter(x => x.parent_id?.toString() === item._id?.toString());
    if (!item.children || item.children.length === 0) return;
    item.children.forEach(c => buildTree(c, list));
}

const verifyParams = async (params) => {
    if (params.parent_id) {
        params.parent = await Reference.getCourse(params.parent_id);
        if (!params.parent) throw HTTP_RESPONSES.NOT_FOUND('parent course', params.parent_id);
    }

    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    return params;
}

module.exports.addCourse = async(params) => {
    params = await verifyParams(params);
    const insert_response = await CourseModel.insertCourse(params);
    return this.getCourse(insert_response?.insertedId);
}

module.exports.updateCourse = async(_id, params) => {
    const course = await CourseModel.getCourse(_id);
    if (!course) {
        throw HTTP_RESPONSES.NOT_FOUND('course', _id);
    }
    const update_response = await CourseModel.updateCourse(course._id, params);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    return this.getCourse(course._id);
}

module.exports.getCourse = async(_id) => {
    if (!_id) return null;
    const course = await CourseModel.getCourse(_id);
    return course;
}

module.exports.getCourses = async(filter) => {
    const courses = await CourseModel.filter(filter);
    if (filter.is_tree_view) {
        return getTreeView(courses);
    }
    return courses;
}