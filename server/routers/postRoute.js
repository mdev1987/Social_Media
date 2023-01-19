import { Router } from 'express';
import { createPost, getFeedPosts, getUserPosts, likePost } from '../controllers/postController.js';
import { verifyToken } from '../middlewares/authMiddleware.js'
import { upload } from '../utilities/multerConfig.js';

const router = Router();
router.use(verifyToken);
router.get('/:userId/posts', getUserPosts);
router.get('/:userId/feeds', getFeedPosts);
router.post('/', upload.single('image'), createPost)
router.patch('/:id/like', likePost);

export default router;