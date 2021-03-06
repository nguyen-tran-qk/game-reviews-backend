'use strict';

import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import gameModel from '../models/gameModel.js';
import reviewModel from '../models/reviewModel.js';

export default {
    Query: {
        getAllReviews: () => {
            try {
                return reviewModel.find({});
            } catch (error) {
                throw new UserInputError(
                    `Failed to retrieve all game reviews: ${error.message}`
                );
            }
        },
        getReviewsByGame: (parent, args) => {
            try {
                return reviewModel.find({ gameId: args.gameId });
            } catch (error) {
                throw new UserInputError(
                    `Failed to retrieve game reviews: ${error.message}`
                );
            }
        },
    },
    Mutation: {
        addReviewToGame: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const newReview = new reviewModel({ ...args, username: user.username });
                return newReview.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to add game review: ${error.message}`
                );
            }
        },
        addReviewToNewGame: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { gameTitle, ...otherArgs } = args;
                const newGame = new gameModel({ title: args.gameTitle });
                await newGame.save();
                const newReview = new reviewModel({ ...otherArgs, username: user.username, gameId: newGame.id });
                return newReview.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to add game review: ${error.message}`
                );
            }
        },
        updateReview: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id, ...data } = args;

                const review = await reviewModel.findById(id);
                if (user.username !== review.username) {
                    throw new UserInputError('You can update only your own review.');
                }

                const reviewModifyData = await reviewModel.findByIdAndUpdate(
                    id,
                    { ...data },
                    {
                        new: true,
                        upsert: true,
                    }
                );
                return reviewModifyData.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to modify game review: ${error.message}`
                );
            }
        },
        deleteReview: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id } = args;

                const review = await reviewModel.findById(id);
                if (user.username !== review.username) {
                    throw new UserInputError('You can delete only your own review.');
                }

                await reviewModel.findByIdAndDelete(id);
                return id;
            } catch (error) {
                throw new UserInputError(
                    `Failed to remove game review: ${error.message}`
                );
            }
        }
    }
};
