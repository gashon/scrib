import { graphql } from 'relay-runtime';

export const DELETE_POST = graphql`
  mutation deletePostMutation($id: ID!) {
    deletePost(input: { id: $id }) {
      id
    }
  }
`;
