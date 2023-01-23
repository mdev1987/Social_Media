import { Schema, model } from "mongoose";

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User Id is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    imagePath: String,
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    comments: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: String,
    }]
}, { timestamps: true })

export default model('posts', postSchema);