import userModel from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id,
            {
                password: 0,
                createdAt: 0,
                updatedAt: 0
            }).lean();
        if (!user) return res.status(404)
            .json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id, {
            password: 0,
            createdAt: 0,
            updatedAt: 0
        })
            .populate('friends', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                occupation: 1,
                location: 1,
                picturePath: 1
            }).lean();
        if (!user) return res.status(404)
            .json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await userModel.findById(id);
        const friend = await userModel.findById(friendId);

        if (!user || !friend) return res.status(404)
            .json({ message: 'User not found' });

        if (user.friends.includes(friendId)) {            
            user.friends = user.friends
                .filter(fId => fId.toString() !== friendId)
            friend.friends = friend.friends
                .filter(fId => fId.toString() !== id)                             
        } else if (!user.friends.includes(friendId)) {            
            user.friends.push(friendId)
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();
        const usr = await userModel.findById(id, {
            password: 0,
            createdAt: 0,
            updatedAt: 0
        })
            .populate('friends', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                occupation: 1,
                location: 1,
                picturePath: 1
            })
            .lean()
        res.status(200).json(usr);
    } catch (ex) {
        res.status(500).json({ message: ex.message })
    }
}