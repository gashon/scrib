import { graphql } from 'relay-runtime';

export const GET_POST_FRAGMENT_NAME = 'Post_post';
export const GET_POST_FRAGMENT = graphql`
  fragment ${GET_POST_FRAGMENT_NAME} on Post {
    id
    title
    content
    published
    created_by {
      id
    }
  }
`;
