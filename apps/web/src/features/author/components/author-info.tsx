import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorInfo$key } from '@scrib/web/__generated__/authorInfo.graphql';
import { CreatePostButton } from '@scrib/web/features/post';
import { graphql } from 'relay-runtime';
import Link from 'next/link';
import Image from 'next/image';
import { userIsLoggedIn } from '@scrib/web/features/auth';

interface AuthorInfoProps {
  user: authorInfo$key;
  createPost: boolean;
}

export const AuthorInfo: FC<AuthorInfoProps> = ({ user, createPost }) => {
  const data = useFragment(
    graphql`
      fragment authorInfo on User {
        fullName
        id
        email
        avatar
      }
    `,
    user,
  );
  if (!data) return null;

  const isLoggedIn = userIsLoggedIn();

  return (
    <div className="flex justify-between items-center w-full py-8">
      <div className="flex flex-row gap-5 justify-center items-center">
        <Image
          src={data.avatar || '/images/default-avatar.png'}
          width={100}
          height={100}
          className="rounded-full"
          alt="avatar"
        />
        {data.fullName && (
          <h2 className="text-3xl underline">{data.fullName}</h2>
        )}
      </div>
      {createPost ? (
        <CreatePostButton />
      ) : (
        <>
          {!isLoggedIn && (
            <Link href="/auth">
              <div className="border-black border rounded px-4 py-2">
                Register/Login
              </div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};
