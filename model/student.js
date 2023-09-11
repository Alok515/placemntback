import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    batch: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    collage: {
        type: String,
        required: true,
    },
    dsa: {
        type: String,
    },
    react: {
        type: String,
    },
    webdev: {
        type: String,
    },
    isPlaced: {
        type: Boolean,
        default: false,
    },
    empId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'employee'
    }
});

studentSchema.statics.addStudent = async function ( student ) {
    if ( !student?.batch || !student?.email || !student?.collage || !student?.empId || !student?.name) {
        throw new Error(" All the student details are required to add a new student data ");
    }
    const isStudentPresent = await this.findOne({ email: student.email, name: student.name });
    if (isStudentPresent) {
        throw new Error("Student already exists try to modify the student");
    }
    const newStudent = await this.create( student );
    if ( !newStudent ) {
        throw new Error("Unable to create student try again");
    }
    return newStudent;
}

studentSchema.statics.getStudent = async function ( id ) {
    if ( !id ) {
        throw new Error("Please provide a id to get a student");
    }
    const student = await this.find({ empId: id });
    if ( !student ) {
        throw new Error("Failed to find student");
    }
    return student;
}

const Student = model( 'Student', studentSchema );

export default Student;