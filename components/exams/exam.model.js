const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const ExamSchema = require('./exam.schema');
const COLLECTION_NAME = "exams";

module.exports.insertExam = async(payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(ExamSchema.INSERT_EXAM, payload);
    const data = await Mongo.insertOne(COLLECTION_NAME, payload);
    return data;
}

module.exports.updateExam = async(user_id, payload) => {
    payload._id = Mongo.id();
    payload.modified_at = new Date();

    payload = Validation.validate(ExamSchema.UPDATE_EXAM, payload);
    const data = await Mongo.updateOne(COLLECTION_NAME, { _id: Mongo.id(user_id)}, { $set: payload});
    return data;
}

module.exports.getExam = async(_id) => {
    const data = await Mongo.findOne(COLLECTION_NAME, { _id: Mongo.id(_id)}, { password: 0 });
    return data;
}

module.exports.filter = async(filter) => {
    const pipeline = [];
    const data = await Mongo.aggregate(COLLECTION_NAME, pipeline);
    return data;
}
