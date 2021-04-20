'use strict';
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    images: [ String ],
    genre: {
        type: String,
        enum: [ 'shooter', 'fighting', 'survival', 'battle royale', 'adventure', 'rpg', 'mmorpg', 'simulation', 'strategy', 'sports' ]
    },
    price: Number,
    studio: String,
    publishedDate: String
});

const gameModel = mongoose.model('Game', gameSchema);

export default gameModel;
