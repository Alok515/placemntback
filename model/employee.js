import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

employeeSchema.statics.signup = async function( employee ) {
    if (!employee?.name || !employee?.email || !employee?.password ) {
        throw new Error ("All Fileds are required");
    }
    const password = employee?.password;
    const emp = await this.findOne({ email: employee.email });
    if( emp ) {
        throw new Error("Employee is already existing try to login");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const empSave = await this.create({
        name: employee?.name,
        email: employee?.email,
        password: hashPassword,
    });
    if ( !empSave ) {
        throw new Error("Failed to register employee");
    }
    return empSave;
}

employeeSchema.statics.login = async function( emp ) {
    if ( !emp?.email || !emp?.password ) {
        throw new Error ("All Fileds are required");
    }
    const employee = await this.findOne({ email: emp.email });
    if ( !employee ) {
        throw new Error("Failed to find employee try to register");
    }
    const result = await bcrypt.compare(emp?.password, employee.password);
    if ( !result ) {
        throw new Error("Password mismatch");
    }
    return employee;
}

const Employee = model('Employee', employeeSchema);

export default Employee;