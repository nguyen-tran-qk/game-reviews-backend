'use strict';

import gameModel from '../models/gameModel.js';
import { AuthenticationError, UserInputError } from 'apollo-server-errors';

export default {
    Query: {
        getAllGames: () => {
            try {
                return gameModel.find({});
            } catch (error) {
                throw new UserInputError(
                    `Failed to retrieve list of games: ${error.message}`
                );
            }
        },
        getGameById: (parent, args) => {
            return gameModel.findById(args.id);
        },
        findGameByTitle: (parent, args) => gameModel.find({ title: args.title })
    },
    Mutation: {
        addGame: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const newGame = new gameModel(args);
                return newGame.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to add game: ${error.message}`
                );
            }
        },
        modifyGame: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id, ...data } = args;
                const gameModifyData = await gameModel.findByIdAndUpdate(
                    id,
                    { ...data },
                    {
                        new: true,
                        upsert: true,
                    }
                );
                return gameModifyData.save();
            } catch (error) {
                throw new UserInputError(
                    `Failed to modify game: ${error.message}`
                );
            }
        },
        removeGame: async (parent, args, context) => {
            try {
                const { user } = context;
                if (!user) throw new AuthenticationError("Not authenticated!");

                const { id } = args;
                await gameModel.findByIdAndDelete(id);
                return id;
            } catch (error) {
                throw new UserInputError(
                    `Failed to remove game: ${error.message}`
                );
            }
        }
    }
};
