// AuthorPosts.tsx
import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';

interface AuthorPostsProps {
  posts: authorPosts$key;
}

export const AuthorPosts: FC<AuthorPostsProps> = ({ posts }) => {
  const data = useFragment(
    graphql`
      fragment authorPosts on PostConnection {
        edges {
          node {
            id
            title
            content
          }
        }
      }
    `,
    posts,
  );

  return (
    <div>
      <h3>Posts:</h3>
      <ul>
        {data.edges.map(({ node }) => (
          <li key={node.id}>
            <h4>{node.title}</h4>
            <p>{node.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
