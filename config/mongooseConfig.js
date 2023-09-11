import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await connect(process.env.DataBase);
        if (connection) {
            console.log("connection established connected to database");
        }
    } catch (error) {
        console.log("Failed to connect", error);
    }
}

export default connectDB;