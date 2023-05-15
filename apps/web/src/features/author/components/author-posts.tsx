import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';
import Link from 'next/link';
import { stripMarkdown } from '@scrib/web/utils';

import dayjs from 'dayjs';

const CONTENT_PREVIEW_LENGTH = 10;
interface AuthorPostsProps {
  posts: authorPosts$key;
}

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
      {data.edges.map(({ node }) => {
        const content = stripMarkdown(node?.content ?? '');
        const shortContent = (content ?? '').slice(0, CONTENT_PREVIEW_LENGTH);
        const hasMoreContent = content?.length > CONTENT_PREVIEW_LENGTH;
        const isDraft = node.status === 'draft';
        return (
          <Link href={isDraft ? `/posts/edit/${node.id}` : `/posts/${node.id}`}>
            <li
              key={node.id}
              className="min-w-52 px-8 py-2 my-8 border-black border-b"
            >
              <div className="flex justify-between">
                <h3 className="text-2xl">{node.title}</h3>
                {isDraft && <p className="text-red-500">Draft</p>}
                {node.isAuthor && (
                  <div className="cursor-pointer hover:underline">
                    <Link href={`/posts/edit/${node.id}`}>Edit</Link>
                  </div>
                )}
              </div>
              <div className="opacity-50 flex justify-between">
                <p>
                  {shortContent}
                  {hasMoreContent && '...'}
                </p>
                <p>{dayjs(node.createdAt).format('MMMM D, YYYY')}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
