'use strict';
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: String,
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    },
    reviewText: String,
    rating: Number,
    images: [ String ],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

const reviewModel = mongoose.model('Review', reviewSchema);

export default reviewModel;
