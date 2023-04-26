import { gql } from 'apollo-server-express';

export const postTypeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    posts(userId: ID!): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    deletePost(id: ID!): Post
    createPost(title: String!, content: String!): Post
    updatePost(id: ID!, title: String!, content: String!): Post
    likePost(id: ID!): Post
    viewPost(id: ID!): Post
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    created_by: User!
    views: Int!
    likes: Int!
  }
`;
