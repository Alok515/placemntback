import { Schema, model } from 'mongoose';

const interviewSchema = new Schema({
    interview: {
        type: String,
        required: true,
        unique: true,
    },
    date : {
        type: Date,
        required: true,
    },
    empId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "employee"
    },
});

interviewSchema.statics.addInterview = async function ( interview ) {
    if ( !interview?.date || !interview?.empId || !interview?.interview ) {
        throw new Error ( "All the missing attributes are required");
    }
    const ifInterviewExist = await this.findOne({ interview: interview.interview });
    if ( ifInterviewExist ) {
        throw new Error ( "Interview alread exists if you want to modify date please update it there instead");
    }
    const newInterview = await this.create( interview );
    return newInterview;
}

interviewSchema.statics.getInterview = async function ( id ) {
    if ( !id ) {
        throw new Error ( 'Please provide a Proper id to view interviews ');
    }
    const interviews = await this.find({ empId: id });
    return interviews;
}

const Interview = model('Interview', interviewSchema);

export default Interview;