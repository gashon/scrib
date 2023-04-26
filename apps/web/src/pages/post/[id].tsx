import { FC } from 'react';
import { useLazyQuery } from 'react-relay';
import { PostContainer } from '@scrib/web/features/post';
import { useRouter } from 'next/router';
import { graphql } from 'relay-runtime';

export const PostPage: FC = () => {
  const router = useRouter();
  const [getPost, { data, error, loading }] = useLazyQuery<any>(graphql`
    query postQuery($id: ID!) {
      post(id: $id) {
        ...getPostFragment
      }
    }
  `);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <>
      <PostContainer />
    </>
  );
};
