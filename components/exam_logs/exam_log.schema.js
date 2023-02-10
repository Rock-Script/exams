const Joi = require('joi');
const { ObjectId, stringObjectIds } = require('../../template/tools/db-validation.tool');
const ReferenceSchema = require('../../template/schemas/reference.schemas');
const { INSERT_QUESTION } = require('../questions/question.schema');

module.exports.POST_EXAM_LOG = {
    institute_id: ObjectId().required(),
    course_id: ObjectId().optional(), 
    exam_id: ObjectId().required()
}

module.exports.GET_EXAM_LOG = {
    exam_log_id: ObjectId().required()
}


module.exports.INSERT_EXAM_LOG = {
    ...this.POST_EXAM_LOG,
    _id: ObjectId(),
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    questions: Joi.array().items(INSERT_QUESTION).min(1).required(),
    course: ReferenceSchema.COURSE_SCHEMA.optional(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional(),
    version: Joi.number().default(0).optional()
}