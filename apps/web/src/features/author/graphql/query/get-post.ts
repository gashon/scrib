import { graphql } from 'react-relay';

export const GET_POST_QUERY = graphql`
  query getPostQuery($id: ID!) {
    post(id: $id) {
      ...getPostFragment
    }
  }
`;
