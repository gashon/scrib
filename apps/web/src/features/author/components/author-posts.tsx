import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';
import Link from 'next/link';

import dayjs from 'dayjs';

const CONTENT_PREVIEW_LENGTH = 10;
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
            createdAt
          }
        }
      }
    `,
    posts
  );

  return (
    <div className="w-full">
      <ul className="w-full">
        {data.edges.map(({ node }) => {
          const shortContent = node.content.slice(0, CONTENT_PREVIEW_LENGTH);
          const hasMoreContent = node.content.length > CONTENT_PREVIEW_LENGTH;

          return (
            <Link href={`/posts/${node.id}`}>
              <li
                key={node.id}
                className="min-w-52 px-8 py-2 my-8 border-black border-b"
              >
                <h3 className="text-2xl">{node.title}</h3>
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
    </div>
  );
};
