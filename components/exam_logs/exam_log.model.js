const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const ExamSchema = require('./exam_log.schema');
const COLLECTION_NAME = "exam_logs";

module.exports.insertExamLog = async(payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(ExamSchema.INSERT_EXAM_LOG, payload);
    const data = await Mongo.insertOne(COLLECTION_NAME, payload);
    return data;
}


module.exports.getExamLog = async(_id) => {
    const data = await Mongo.findOne(COLLECTION_NAME, { _id: Mongo.id(_id)}, { password: 0 });
    return data;
}