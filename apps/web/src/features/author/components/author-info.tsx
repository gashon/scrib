import React, { FC } from 'react';
import { useFragment } from 'react-relay';
import { authorInfo$key } from '@scrib/web/__generated__/authorInfo.graphql';
import { graphql } from 'relay-runtime';

interface AuthorInfoProps {
  user: authorInfo$key;
}

export const AuthorInfo: FC<AuthorInfoProps> = ({ user }) => {
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
    <div className="w-full py-8 ">
      {data.fullName && <h2 className="text-3xl underline">{data.fullName}</h2>}
    </div>
  );
};
