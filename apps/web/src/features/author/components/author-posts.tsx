import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorPosts$key } from '@scrib/web/__generated__/authorPosts.graphql';
import { graphql } from 'relay-runtime';
import Link from 'next/link';

import dayjs from 'dayjs';
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

  console.log('posts', data);

  return (
    <div className="w-full">
      <h3>Posts:</h3>
      <ul className="w-full">
        {data.edges.map(({ node }) => (
          <Link href={`/posts/${node.id}`}>
            <li
              key={node.id}
              className="min-w-52 px-8 py-4 my-2 border-1 border-black"
            >
              <h3 className="text-2xl">{node.title}</h3>
              <div className="opacity-50 flex justify-between">
                <p>{node.content}</p>
                <p>{dayjs(node.createdAt).format('MMMM D, YYYY')}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
