import { graphql } from 'react-relay';

export const GET_AUTHOR_AND_POSTS_QUERY = graphql`
  query getAuthorAndPostsQuery($id: ID!) {
    user(id: $id) {
      ...authorInfo
      ...settingsModalInfo
      posts(orderBy: [{ field: "created_at", order: DESC }]) {
        ...authorPosts
      }
    }
  }
`;
