import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';
import { PostItem } from '@scrib/web/features/post';
import { useIsMounted } from '@scrib/web/hooks';
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

export const AuthorPosts: FC<AuthorPostsProps> = ({ posts: postsQuery }) => {
  const [posts, setPosts] = React.useState<{
    edges: { node: PostNode }[];
  }>({
    edges: [],
  });
  const isMounted = useIsMounted();
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
    postsQuery
  );

  React.useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  const onDelete = (id: string) => {
    setPosts((p) => ({
      edges: p.edges.filter((e) => e.node.id !== id),
    }));
  };

  if (!isMounted) return null;

  return (
    <ul className="w-full">
      {data.edges.length === 0 && (
        <li className="w-full">
          <h3 className="text-lg opacity-75">No posts yet</h3>
        </li>
      )}
      {posts.edges.map(({ node }) => {
        return <PostItem node={node} onDelete={() => onDelete(node.id)} />;
      })}
    </ul>
  );
};
