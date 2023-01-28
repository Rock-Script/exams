const _ = require('lodash');
const Joi = require('joi');
const { ObjectId } = require('../../template/tools/db-validation.tool');
const QUESTION_TYPES = require('../../template/contants/question-types');

module.exports.GET_QUESTION = {
    question_id: ObjectId()
}

module.exports.PATCH_QUESTION_PARAMS = {
    exam_id: ObjectId(),
    question_id: ObjectId()
}

module.exports.DELETE_QUESTION_PARAMS = {
    exam_id: ObjectId(),
    question_id: ObjectId()
}


module.exports.GET_QUESTIONS = {
}


module.exports.POST_QUESTION_PARAMS = {
    exam_id: ObjectId()
}

module.exports.POST_QUESTION = {
    institute_id: ObjectId().required(),
    name: Joi.string().required().min(3).max(100),
    type: Joi.string().valid(...(_.values(QUESTION_TYPES))).optional().allow(null, ""),
    options: Joi.array().optional()
}

module.exports.INSERT_QUESTION = {
    ...this.POST_QUESTION,
    _id: ObjectId(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}

module.exports.PATCH_QUESTION = {
    name: Joi.string().optional().min(3).max(100),
    type: Joi.string().valid(...(_.values(QUESTION_TYPES))).optional(),
    options: Joi.array().optional()
}

module.exports.UPDATE_QUESTION = {
    ...this.PATCH_QUESTION,
    modified_at: Joi.date().required()
}
