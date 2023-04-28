import { FC } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import {
  AuthorInfo,
  AuthorPosts,
  GET_AUTHOR_AND_POSTS_QUERY,
} from '@scrib/web/features/author';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';

export const AuthorPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // todo typesafety
  const query = useLazyLoadQuery<any>(GET_AUTHOR_AND_POSTS_QUERY, { id });

  return (
    <>
      {/* <AuthorInfo user={query.user} /> */}
      <AuthorPosts posts={query.user.posts} />{' '}
    </>
  );
};
