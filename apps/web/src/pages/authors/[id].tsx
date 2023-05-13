import { useLazyLoadQuery } from 'react-relay';
import {
  AuthorInfo,
  AuthorPosts,
  GET_AUTHOR_AND_POSTS_QUERY,
} from '@scrib/web/features/author';

type Props = {
  authorId: string;
};

export default function AuthorPage({ authorId }: Props) {
  // todo typesafety
  const query = useLazyLoadQuery<any>(GET_AUTHOR_AND_POSTS_QUERY, {
    id: authorId,
  });

  return (
    <div className="w-screen h-min-screen flex justify-center">
      <div className="flex flex-col w-3/4">
        <div className="w-full flex flex-row">
          <AuthorInfo user={query.user} authorSlug={authorId} />
        </div>
        <AuthorPosts posts={query.user.posts} />{' '}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  return {
    props: {
      authorId: id,
    },
  };
}
