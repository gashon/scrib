import { graphql } from 'relay-runtime';

export const UPDATE_POST = graphql`
  mutation updatePostMutation($id: ID!, $title: String!, $content: String!) {
    updatePost(input: { id: $id, title: $title, content: $content }) {
      id
      title
      content
    }
  }
`;
