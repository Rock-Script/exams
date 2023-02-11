const _ = require('lodash');
const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const DB_COLLECTIONS = require('../../template/contants/db-collections');
const QuestionSchema = require('./question.schema');
const COLLECTION_NAME = "questions";

module.exports.insertQuestion = async(exam_id, payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(QuestionSchema.INSERT_QUESTION, payload);
    await Mongo.updateOne(
        DB_COLLECTIONS.EXAMS, 
        {_id: Mongo.id(exam_id)},
        {
            $push: {
                questions: payload
            }
        }
    );
    return payload;
}

module.exports.updateQuestion = async(exam_id, index, payload) => {
    payload.modified_at = new Date();
    payload = Validation.validate(QuestionSchema.UPDATE_QUESTION, payload);

    const changes = {};
    _.keys(payload).forEach(field => {
        changes[`questions.${index}.${field}`] = payload[field]
    })
    const data = await Mongo.updateOne(DB_COLLECTIONS.EXAMS, 
        { _id: Mongo.id(exam_id)}, 
        { $set: changes }
    );
    return data;
}

module.exports.deleteQuestion = async(exam_id, question_id) => {
    const data = await Mongo.updateOne(DB_COLLECTIONS.EXAMS, 
        { _id: Mongo.id(exam_id)}, 
        { $pull: {
            [`questions`]: {
                _id: Mongo.id(question_id)
            }
        } }
    );
    return data;
}
