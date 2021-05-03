'use strict';

import { gql } from 'apollo-server-express';

export default gql`
    type Game {
        id: ID!
        title: String!
        description: String
        images: [String]
        genres: [Genre]
        price: Float
        studio: String
        publishedDate: String
    }

    enum Genre {
        shooter
        fighting
        survival
        battleRoyale
        adventure
        rpg
        mmorpg
        simulation
        strategy
        sports
    }

    extend type Query {
        getAllGames: [Game]
        getGameById(id: ID!): Game
        findGameByTitle(title: String!): [Game]
    }

    extend type Mutation {
        addGame(
            title: String!
            description: String
            images: [String] = []
            genres: [Genre]
            price: Float
            studio: String
            publishedDate: String
        ): Game
        modifyGame(
            id: ID!
            title: String
            description: String
            images: [String]
            genres: [Genre]
            price: Float
            studio: String
            publishedDate: String
        ): Game
        removeGame(id: ID!): ID
    }
`;
