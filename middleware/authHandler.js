import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET);
    next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ error: error.message});
    }
}

export default checkAuth;