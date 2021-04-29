'use strict';

import { gql } from 'apollo-server-express';

export default gql`
    type Review {
        id: ID
        username: String!
        gameId: ID!
        reviewText: String!
        rating: Float!
        images: [String]
        createdAt: String
    }

    extend type Query {
        getReviewsByGame(gameId: ID!): [Review]
    }

    extend type Mutation {
        addReviewToGame(
            gameId: ID!,
            reviewText: String!,
            rating: Float!,
            images: [String]
        ): Review
        updateReview(
            id: ID!,
            reviewText: String!,
            rating: Float!,
            images: [String]
        ): Review
        deleteReview(id: ID!): ID
    }
`;