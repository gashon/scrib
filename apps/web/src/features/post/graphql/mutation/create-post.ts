import { graphql } from 'relay-runtime';

export const CREATE_POST = graphql`
  mutation createPostMutation($title: String!) {
    createPost(input: { title: $title }) {
      id
      title
    }
  }
`;
