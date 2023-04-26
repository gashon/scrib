import { graphql } from 'relay-runtime';

export const CREATE_POST = graphql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $published: Boolean!
    $created_by: ID!
  ) {
    createPost(
      title: $title
      content: $content
      published: $published
      created_by: $created_by
    ) {
      id
      title
      content
      published
      created_by {
        id
      }
    }
  }
`;
