'use strict';

import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import commentModel from '../models/commentModel.js';

export default {
    Query: {
        getReviewComments: (parent, args) => {
            try {
                return commentModel.find({ reviewId: args.reviewId });
            } catch (error) {
                throw new UserInputError(
                    `Failed to retrieve review comments: ${error.message}`
                );
            }
        },
    },
    Mutation: {
        addCommentToReview: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const newComment = new commentModel({ ...args, username: user.username });
                return newComment.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to add review comment: ${error.message}`
                );
            }
        },
        editComment: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id, ...data } = args;

                const comment = await commentModel.findById(id);
                if (user.username !== comment.username) {
                    throw new UserInputError('You can edit only your own comment.');
                }

                const commentModifyData = await commentModel.findByIdAndUpdate(
                    id,
                    { ...data },
                    {
                        new: true,
                        upsert: true,
                    }
                );
                return commentModifyData.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to edit comment: ${error.message}`
                );
            }
        },
        deleteComment: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id } = args;

                const comment = await commentModel.findById(id);
                if (user.username !== comment.username) {
                    throw new UserInputError('You can delete only your own comment.');
                }

                await commentModel.findByIdAndDelete(id);
                return id;
            } catch (error) {
                throw new UserInputError(
                    `Failed to delete comment: ${error.message}`
                );
            }
        }
    }
};
