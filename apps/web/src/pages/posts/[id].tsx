import { FC } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { GET_POST_QUERY } from '@scrib/web/features/author';
import { PostContainer } from '@scrib/web/features/post';

const PostPage: FC<{ postId: string }> = ({ postId }) => {
  const query = useLazyLoadQuery(GET_POST_QUERY, {
    id: postId,
  });

  return (
    <>
      <PostContainer query={query.post} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      postId: params.id,
    },
  };
}

export default PostPage;
