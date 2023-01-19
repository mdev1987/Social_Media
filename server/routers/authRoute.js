import { Router } from 'express';
import { upload } from '../utilities/multerConfig.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', upload.single('picture'), registerUser)
router.post('/login', loginUser)

export default router;