import { Schema, model } from "mongoose";

const resultSchema = new Schema({
    result: {
        type: String,
        enum: ['Cleared', 'Failed', 'Pending', 'Did Not Attempt'],
        default: 'Pending',
    },
    empId: {
        type: Schema.Types.ObjectId,
        ref: 'employee',
        required: true,
    },
    interviewId: {
        type: Schema.Types.ObjectId,
        ref: "interview",
        required: true
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "student",
        required: true
    }
});

const Result = model('Result', resultSchema);

export default Result;