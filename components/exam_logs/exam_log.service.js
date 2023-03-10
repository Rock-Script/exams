const ExamLogModel = require('./exam_log.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const EXAM_LOG_STATUS = require('../../template/contants/exam-log-status');
const Reference = require('../../template/tools/reference-tool');

const verifyParams = async (params) => {
    if (params.course_id) {
        params.course = await Reference.getCourse(params.course_id);
        if (!params.course) throw HTTP_RESPONSES.NOT_FOUND('course', params.course_id);
    }

    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    if (params.exam_id) {
        params.exam = await Reference.getExam(params.exam_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('exam', params.exam);
    }
    return params;
}

module.exports.addExamLog = async(params) => {
    params = await verifyParams(params);
    params = {
        ...params,
        questions: params.exam.published_questions,
        weightage: params.exam.published_weightage
    }
    const insert_response = await ExamLogModel.insertExamLog(params);
    return this.getExamLog(insert_response?.insertedId);
}

module.exports.getExamLog = async(_id) => {
    if (!_id) return null;
    const exam = await ExamLogModel.getExamLog(_id);
    if (exam.status !== EXAM_LOG_STATUS.COMPLETED) {
        exam.questions.forEach(q => {
            delete q.answer;
        })
    }
    return exam;
}

module.exports.getList = async(filter) => {
    const list = ExamLogModel.getExamLogList(filter);
    return list;
}

module.exports.submitExamLog = async(exam_log_id) => {
    const exam_log = await this.getExamLog(exam_log_id);
    if (!exam_log) {
        throw HTTP_RESPONSES.NOT_FOUND('exam log', exam_log_id);
    }
    let total_questions = 0, correct_answers = 0, wrong_answers = 0, no_answers = 0, marks_obtained = 0;
    exam_log.questions.forEach(q => {
        total_questions++;
        if (q.user_answer) {
            if (q.user_answer == q.answer) {
                correct_answers++;
                marks_obtained += q.weightage;
            } else {
                wrong_answers++;
            }
        } else {
            no_answers++;
        }
    })
    const payload = {
        submitted_at: new Date(),
        status: EXAM_LOG_STATUS.COMPLETED,
        total_questions,
        correct_answers,
        wrong_answers,
        no_answers,
        marks_obtained
    }
    payload.time_taken = new Date(payload.submitted_at).getTime() - new Date(exam_log.created_at).getTime();
    await ExamLogModel.submitExamLog(exam_log_id, payload);
    return {
        ...exam_log,
        ...payload
    };
}

module.exports.saveAnswer = async(exam_log_id, question_id, params) => {
    const exam_log = await this.getExamLog(exam_log_id);
    if (!exam_log) {
        throw HTTP_RESPONSES.NOT_FOUND('exam log', exam_log_id);
    }
    const question = exam_log.questions.find(q => q._id.toString() === question_id);
    if (!question) {
        throw HTTP_RESPONSES.NOT_FOUND('question', question_id);
    }
    const save_answer_response = await ExamLogModel.saveAnswer(exam_log_id, question_id, params.answer);
    if (save_answer_response?.matchedCount) {
        return {
            ...question,
            user_answer: params.answer,
            answer: params.answer
        }
    }
    return question;
}