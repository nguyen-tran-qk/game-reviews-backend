'use strict';

import { gql } from "apollo-server-core";

export default gql`
  type User {
    username: String!
    id: ID!
    role: UserRole!
    token: String
  }

  enum UserRole {
    ADMIN
    MEMBER
  }

  type Query {
    login(username: String!, password: String!): User
  }

  type Mutation {
    register(username: String!, password: String!): User
    registerAdmin(username: String!, password: String!): User
  }
`;