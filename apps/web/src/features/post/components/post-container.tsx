import { FC } from 'react';
import { useFragment } from 'react-relay';
import { GET_POST_FRAGMENT } from '@scrib/web/features/post';

export const PostContainer: FC = () => {
  const post = useFragment<any>(GET_POST_FRAGMENT, null);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};
