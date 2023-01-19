import { Router } from "express";
import { verifyToken } from '../middlewares/authMiddleware.js'
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/userController.js'
const router = Router();

router.use(verifyToken);
router.get('/:id', getUser);
router.get('/:id/friends', getUserFriends);

router.patch('/:id/:friendId', addRemoveFriend);

export default router;