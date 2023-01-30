const Joi = require('joi');
const { ObjectId, stringObjectIds } = require('../../template/tools/db-validation.tool');
const ReferenceSchema = require('../../template/schemas/reference.schemas');

module.exports.GET_EXAM = {
    exam_id: ObjectId()
}

module.exports.GET_EXAMS = {
    course_ids: stringObjectIds().optional().default(null)
}

module.exports.POST_EXAM = {
    institute_id: ObjectId().required(),
    course_id: ObjectId().required(), 
    name: Joi.string().required().min(3).max(100)
}

module.exports.INSERT_EXAM = {
    ...this.POST_EXAM,
    _id: ObjectId(),
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    course: ReferenceSchema.COURSE_SCHEMA.required(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}

module.exports.PATCH_EXAM = {
    name: Joi.string().optional().min(3).max(100),
}

module.exports.UPDATE_EXAM = {
    ...this.PATCH_EXAM,
    course: ReferenceSchema.COURSE_SCHEMA.optional(),
    modified_at: Joi.date().required()
}
