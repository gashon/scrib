import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorInfo$key } from '@scrib/web/__generated__/authorInfo.graphql';
import { graphql } from 'relay-runtime';
import Link from 'next/link';
import { CreatePostButton } from '@scrib/web/features/post';

interface AuthorInfoProps {
  user: authorInfo$key;
  authorSlug: string;
}

export const AuthorInfo: FC<AuthorInfoProps> = ({ user, authorSlug }) => {
  const data = useFragment(
    graphql`
      fragment authorInfo on User {
        fullName
        id
        email
      }
    `,
    user
  );

  return (
    <div className="flex justify-between items-center w-full py-8">
      {data.fullName && <h2 className="text-3xl underline">{data.fullName}</h2>}
      {data && data.id === authorSlug ? (
        <CreatePostButton />
      ) : (
        <Link href="/auth">
          <div className="border-black border rounded px-4 py-2">
            Register/Login
          </div>
        </Link>
      )}
    </div>
  );
};
