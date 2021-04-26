'use strict';
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    username: String,
    commentText: String,
}, { timestamps: true });

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
