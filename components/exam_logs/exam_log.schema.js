const _ = require('lodash');
const Joi = require('joi');
const { ObjectId, stringObjectIds } = require('../../template/tools/db-validation.tool');
const ReferenceSchema = require('../../template/schemas/reference.schemas');
const { INSERT_QUESTION } = require('../questions/question.schema');
const EXAM_LOG_STATUS = require('../../template/contants/exam-log-status');

module.exports.POST_EXAM_LOG = {
    institute_id: ObjectId().required(),
    course_id: ObjectId().optional(), 
    exam_id: ObjectId().required()
}

module.exports.GET_EXAM_LOG_LIST = {
    institute_id: ObjectId().required(),
    course_id: ObjectId().optional(), 
    exam_id: ObjectId().optional()
}

module.exports.GET_EXAM_LOG = {
    exam_log_id: ObjectId().required()
}

module.exports.SUBMIT_EXAM_LOG_PARAMS = {
    exam_log_id: ObjectId().required()
}

module.exports.POST_EXAM_LOG_QUESTION_ANSWER_PARAMS = {
    exam_log_id: ObjectId().required(),
    question_id: ObjectId().required()
}

module.exports.POST_EXAM_LOG_QUESTION_ANSWER_BODY = {
    answer: Joi.alternatives().try(
        Joi.string(),
        Joi.number(),
        Joi.array()
    ).optional()
}

module.exports.INSERT_EXAM_LOG = {
    ...this.POST_EXAM_LOG,
    _id: ObjectId(),
    institute: ReferenceSchema.INSTITUTE_SCHEMA.required(),
    weightage: Joi.number().optional(),
    questions: Joi.array().items(INSERT_QUESTION).min(1).required(),
    course: ReferenceSchema.COURSE_SCHEMA.optional(),
    status: Joi.string().valid(...(_.values(EXAM_LOG_STATUS))).optional().default(EXAM_LOG_STATUS.IN_PROGRESS),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional(),
    version: Joi.number().default(0).optional()
}