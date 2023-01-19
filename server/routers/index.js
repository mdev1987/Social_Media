import { Router } from 'express';
import { errorHandler } from '../middlewares/errorMiddleware.js';
import authRouter from './authRoute.js';

const router = Router();

router.use('/auth', authRouter);

router.use(errorHandler);
export default router;