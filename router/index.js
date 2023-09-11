import { Router } from 'express';
import authRouter from './auth/auth.js';
import empRoute from './emp/emp.js';
const router = new Router();

router.use('/auth', authRouter);
router.use('/emp', empRoute);

export default router;