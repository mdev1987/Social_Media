import postModel from '../models/postModel.js'
import userModel from '../models/userModel.js';

export const createPost = async (req, res) => {
    try {
        const { userId, description } = req.body;
        const { path: imagePath } = req.file ?? '';
        const newPost = new postModel({
            userId,
            description,
            imagePath: imagePath?.slice('public/'.length) || ''
        })
        await newPost.save();
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getFeedPosts = async (req, res) => {
    const { userId } = req.params;
    try {
        const userPosts = await postModel.find({ userId })
            .populate('userId', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                picturePath: 1
            }).populate('comments', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                picturePath: 1
            })
            .lean();

        const user = await userModel.findById(userId).lean();
        const friendsPosts = await postModel.find({ userId: { $in: [...user.friends] } })
            .populate('userId', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                picturePath: 1
            }).populate('comments', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                picturePath: 1
            }).lean();

        const posts = userPosts.concat(friendsPosts)
            .sort((a, b) => a.createdAt - b.createdAt);

        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await postModel.find({ userId })
            .populate('comments', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                picturePath: 1
            }).lean();
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await postModel.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' })
        if (post.likes.includes(userId)) {
            await post.updateOne({ $pull: { likes: userId } })
        } else if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
        }
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
