'use strict';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
});

const userModel = mongoose.model('User', userSchema);

export default userModel;