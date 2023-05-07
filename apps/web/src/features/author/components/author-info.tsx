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
        id
        name
        email
      }
    `,
    user,
  );

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
    </div>
  );
};
