import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(email: String!): User!
    updateUser(id: ID!, name: String, email: String, avatar: String, last_login: String): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String!
    last_login: String
  }
`;