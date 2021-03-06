'use strict';

import { AuthenticationError, UserInputError } from 'apollo-server-errors';
import commentModel from '../models/commentModel.js';
import reviewModel from '../models/reviewModel.js';

export default {
    Mutation: {
        addCommentToReview: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { reviewId, ...otherArgs } = args;

                let newComment = new commentModel({ ...otherArgs, username: user.username });
                newComment = await newComment.save();

                const review = await reviewModel.findById(reviewId);
                review.comments = review.comments.concat(newComment.id);
                await review.save();
                return newComment;
            } catch (error) {
                throw new UserInputError(
                    `Failed to add comment: ${error.message}`
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
