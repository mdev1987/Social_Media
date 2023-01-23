import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const registerUser = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation,
        } = req.body;
        const { path: picturePath } = req.file || '';
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: picturePath?.slice('public/'.length) || '',
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        await newUser.save();
        newUser.password = undefined;
        res.status(200).json(newUser);

    } catch (ex) {
        res.status(500).json({ error: ex.message })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).lean();
        if (!user) return res.status(400).json({ message: 'User does not exist!' });
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ message: 'Password is incorrect!' })
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // delete user.password;  // must use lean() function
        user.password = undefined;
        res.status(200).json({ user, token });
    } catch (ex) {
        res.status(500).json({ error: ex.message })
    }
}