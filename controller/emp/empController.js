import Student from "../../model/student.js";
import Interview from '../../model/interview.js';
import Result from "../../model/results.js";

const getStudent = async (req, res) => {
    const id = req.params?.id;
    try {
        const students = await Student.getStudent(id);
        return res.status(200).json(students);
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const addStudent = async (req, res) => {
    const id = req.params?.id;
    const student = req.body;
    student.empId = id;
    try {
        const newStudent = await Student.addStudent( student );
        return res.status(201).json(newStudent);
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const getInterview = async (req, res) => {
    const id = req.params?.id;
    try {
        const interviews = await Interview.getInterview( id );
        return res.status(200).json( interviews );
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const addinterview = async (req, res) => {
    const id = req.params?.id;
    const interview = req.body;
    interview.empId = id;
    try {
        const newInterview = await Interview.addInterview( interview );
        return res.status(201).json( newInterview );
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const updateStudent = async (req, res) => {
    const id = req.params?.id;
    const studentData = req.body;
    try {
        const newStudent = await Student.findOne( { name: studentData.name, email: studentData.email , empId: id });
        if (newStudent) {
            newStudent.isPlaced = true;
        }
        await newStudent.save();
        return res.status(200).json({
            'message': 'Student updated successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

const updateInterview = async (req, res) => {
    const empId = req.params?.id;
    const { id, studentId } = req.body;
    console.log(studentId);
    try {
        const newRestult = await Result.findOne( { empId: empId, interviewId: id, studentId: studentId });
        if (!newRestult){
            const newRestult = await Result.create( {
                interviewId: id,
                empId: empId,
                studentId: studentId
            });
            console.log(newRestult);
            return res.status(201).json({message: 'Restult updated'});
        }
        else {
            return res.status(401).json({message: "Student allready added"});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}


const getResult = async (req, res) => {
    const empId = req.params.id;
    try {
        const results = await Result.find({ empId: empId }).populate({
            path: 'studentId',
            model: "Student",
            select: "name"
        }).populate({
            path: 'interviewId',
            model: "Interview",
            select: "interview"
        });

        if(results.length > 0) {
            const response = results.map(result => {
                return {
                    result: result.result,
                    interviewName: result.interviewId.interview,
                    studentName: result.studentId.name,
                }
            });
            console.log(response);
            return res.status(200).json(response);
        }
        else {
            return res.status(401).json({message: 'error in finding result'});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message });
    }
}

import objectToCsv from 'objects-to-csv';
import moment from 'moment';
import { resolve } from 'path';

const formatDataTo = (data) => {
    const newData = data.map(d => ({
        result: d.result,
        interview: d.interviewId.interview,
        interviewDate: moment(d.interviewId.date).format('DD/MM/YYYY'),
        studentName: d.studentId.name,
        studentBatch: d.studentId.batch,
        studentEmail: d.studentId.email,
        studentCollage: d.studentId.collage,
        studentDsa: d.studentId.dsa,
        studentReact: d.studentId.react,
        studentWeb: d.studentId?.webdev,
        placementStatus: d.studentId.isPlaced ? 'Placed' : 'Not Placed'
    }));
    return newData;
}
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const csvHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        console.log(__dirname);
        const data = await Result.find({ empId: id }).populate({ path: 'studentId', model: 'Student' }).populate({ path: 'interviewId', model: 'Interview' });
        const dataFormat = formatDataTo(data);
        const csvData = new objectToCsv(dataFormat);
        const pathToFile = join(__dirname, '../../download');
        await csvData.toDisk('./download/test.csv', { allColumns: true });
        console.log(csvData);
        res.status(200).download(resolve(pathToFile, 'test.csv'));
    } catch (error) {
        console.log(error);
    }
}

const studentController = {
    getStudent,
    addStudent,
    getInterview,
    addinterview,
    updateStudent,
    updateInterview,
    getResult,
    csvHandler,
}

export default studentController;