'use strict';

import { gql } from "apollo-server-core";

export default gql`
  type User {
    username: String!
    id: ID!
    token: String
  }
  type Query {
    login(username: String!, password: String!): User
  }
  type Mutation {
    register(username: String!, password: String!): User
  }
`;