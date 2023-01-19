import { Router } from 'express';
import multer from 'multer';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage })

router.post('/register', upload.single('picture'), registerUser)

router.post('/login', loginUser)

export default router;