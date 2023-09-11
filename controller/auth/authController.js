import Employee from '../../model/employee.js';
import JWT from 'jsonwebtoken';

const createToken = ( id ) => {
    return JWT.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30min'}
        );
}

const login = async ( req, res ) => {
    try {
        const emp = await Employee.login( req.body );
        const token = createToken( emp._id );
        return res.status(200).json({
            emp: {
                token,
                id: emp._id,
            },
            message: 'Login successful'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
}

const signup = async ( req, res ) => {
    try {
        const emp = await Employee.signup( req.body );
        const token = createToken( emp._id );
        return res.status(201).json({
            emp: {
                token,
                id: emp._id,
            },
            message: 'Resgistration successful'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
}

const auth = {
    login,
    signup,
};

export default auth;
