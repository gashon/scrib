import { graphql } from 'relay-runtime';

export const GET_POST_FRAGMENT_NAME = 'getPostFragment';
export const GET_POST_FRAGMENT = graphql`
  fragment getPostFragment on Post {
    id
    title
    content
    createdBy
  }
`;
