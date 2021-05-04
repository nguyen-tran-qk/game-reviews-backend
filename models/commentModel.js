'use strict';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    username: String,
    commentText: String,
}, { timestamps: true });

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
