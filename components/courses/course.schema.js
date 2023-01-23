const Joi = require('joi');
const ReferenceSchema = require('../../template/schemas/reference.schemas');
const { ObjectId } = require('../../template/tools/db-validation.tool');

module.exports.GET_COURSE = {
    course_id: ObjectId()
}

module.exports.GET_COURSES = {
    is_tree_view: Joi.boolean().optional().default(false)
}

module.exports.POST_COURSE = {
    institute_id: ObjectId().required(),
    name: Joi.string().required().min(1).max(100),
    parent_id:  ObjectId().optional().allow(null).default(null)
}

module.exports.INSERT_COURSE = {
    ...this.POST_COURSE,
    _id: ObjectId(),
    parent: ReferenceSchema.COURSE_PARENT_SCHEMA.optional(),
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}

module.exports.PATCH_COURSE = {
    name: Joi.string().optional().min(1).max(100),
    parent_id:  ObjectId().optional()
}

module.exports.UPDATE_COURSE = {
    ...this.PATCH_COURSE,
    modified_at: Joi.date().required()
}
