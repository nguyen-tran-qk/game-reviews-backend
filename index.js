'use strict';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import connectMongo from './db.js';
import { checkAuth } from './passport/auth.js';

dotenv.config();

(async () => {
    try {
        const conn = await connectMongo();
        if (conn) {
            console.log("Connected successfully.");
        }

        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({ req, res }) => {
                if (req) {
                    const user = await checkAuth(req, res);
                    console.log("Current user", user);
                    return {
                        req,
                        res,
                        user,
                    };
                }
            },
            playground: process.env.NODE_ENV === 'development'
        });

        const app = express();
        app.use(helmet({
            contentSecurityPolicy: false,
            ieNoOpen: false
        }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        server.applyMiddleware({ app, path: '/' });

        if (process.env.NODE_ENV === 'production') {
            console.log('prduction');
            const { default: production } = await import('./sec/production.js');
            production(app, 3000);
        } else {
            console.log('localhost');
            const { default: localhost } = await import('./sec/localhost.js');
            localhost(app, 8000, 3001);
        }
    } catch (e) {
        console.log("server error: " + e.message);
    }
})();