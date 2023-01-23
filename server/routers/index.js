import { Router } from 'express';
import { errorHandler } from '../middlewares/errorMiddleware.js';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/posts', postRoute);

router.use(errorHandler);
export default router;