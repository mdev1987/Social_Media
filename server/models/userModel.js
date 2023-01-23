import { Schema, model } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required!'],
        trim: true,
        lowercase: true,
        minLength: [2, 'firstName must be greater than 2 characters!'],
        maxLength: [50, 'firstName must be less than 50 characters!']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'lastName is required!'],
        lowercase: true,
        minLength: [2, 'lastName must be greater than 2 characters!'],
        maxLength: [50, 'lastName must be less than 50 characters!']
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required!'],
        minLength: [5, 'password must be greater than 5 characters!'],
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,

}, { timestamps: true })

export default model('users', userSchema)