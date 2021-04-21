'use strict';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ 'ADMIN', 'MEMBER' ],
        default: 'MEMBER'
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;