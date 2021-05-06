'use strict';

import { gql } from 'apollo-server-express';

export default gql`
    type Comment {
        id: ID!
        username: String!
        commentText: String!
        createdAt: String
    }

    extend type Mutation {
        addCommentToReview(reviewId: ID!, commentText: String!): Comment
        editComment(id: ID!, commentText: String!): Comment
        deleteComment(id: ID!): ID
    }
`;