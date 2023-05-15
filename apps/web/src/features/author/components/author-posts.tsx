import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';
import { PostItem } from '@scrib/web/features/post';

interface AuthorPostsProps {
  posts: authorPosts$key;
}

export type PostNode = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  isAuthor: boolean;
};

export const AuthorPosts: FC<AuthorPostsProps> = ({ posts }) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const data = useFragment(
    graphql`
      fragment authorPosts on PostConnection {
        edges {
          node {
            id
            title
            content
            createdAt
            status
            isAuthor
          }
        }
      }
    `,
    posts
  );

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!data || !isMounted) return null;

  return (
    <ul className="w-full">
      {data.edges.length === 0 && (
        <li className="w-full">
          <h3 className="text-lg opacity-75">No posts yet</h3>
        </li>
      )}
      {data.edges.map(({ node }) => (
        <PostItem node={node} />
      ))}
    </ul>
  );
};
