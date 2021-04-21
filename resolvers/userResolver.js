'use strict';
import { AuthenticationError, UserInputError } from "apollo-server-errors";
import bcrypt from "bcrypt";
import { login } from "../passport/auth.js";
import userModel from "../models/userModel.js";

export default {
    Query: {
        login: async (_, args, context) => {
            const { req, res } = context;
            req.body = args;

            try {
                const authResponse = await login(req, res);

                return {
                    id: authResponse.user._id,
                    username: authResponse.user.username,
                    token: authResponse.token,
                };
            } catch (error) {
                throw new AuthenticationError(error.message || error);
            }
        },
    },
    Mutation: {
        register: async (_, args) => {
            try {
                const { username, password } = args;

                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new userModel({ username, password: hashedPassword, role: 'MEMBER' });

                return newUser.save();
            } catch (error) {
                throw new UserInputError(
                    `Error while creating an account: ${error.message}`
                );
            }
        },
        registerAdmin: async (_, args) => {
            try {
                const hasAdmin = await userModel.findOne({ role: 'ADMIN' }).exec();
                if (hasAdmin) {
                    console.log(hasAdmin);
                    throw new Error('Admin user already exists.');
                }

                const { username, password } = args;
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new userModel({ username, password: hashedPassword, role: 'ADMIN' });

                return newUser.save();
            } catch (error) {
                throw new UserInputError(
                    `Error while creating an admin user: ${error.message}`
                );
            }
        }
    },
};
