import { FC } from 'react';
import { useFragment } from 'react-relay';
import { GET_POST_FRAGMENT } from '@scrib/web/features/post';

type Props = {
  query: any;
};

export const PostContainer: FC<Props> = ({ query }) => {
  const post = useFragment<any>(GET_POST_FRAGMENT, query);

  if (!post) return null;

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};
