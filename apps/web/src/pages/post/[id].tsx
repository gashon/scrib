import { FC } from 'react';
import { useQueryLoader } from 'react-relay';
import { GET_AUTHOR_AND_POSTS_QUERY } from '@scrib/web/features/author';
import { PostContainer } from '@scrib/web/features/post';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';

export const PostPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // todo typesafety
  const [queryRef, loadQuery, disposeQuery] = useQueryLoader<any>(
    GET_AUTHOR_AND_POSTS_QUERY,
  );

  // load the query
  loadQuery({ id });
  disposeQuery();

  return (
    <>
      <PostContainer />
    </>
  );
};
