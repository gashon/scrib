import { graphql } from 'relay-runtime';

export const CREATE_POST = graphql`
  mutation createPostMutation($title: String!, $content: String!) {
    createPost(input: { title: $title, content: $content }) {
      id
      title
    }
  }
`;
