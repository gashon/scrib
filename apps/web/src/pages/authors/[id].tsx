import { useLazyLoadQuery } from 'react-relay';
import {
  AuthorInfo,
  AuthorPosts,
  GET_AUTHOR_AND_POSTS_QUERY,
} from '@scrib/web/features/author';
import type { getAuthorAndPostsQuery } from '@scrib/web/__generated__/GetAuthorAndPostsQuery.graphql';

type Props = {
  authorId: string;
};

export default function AuthorPage({ authorId }: Props) {
  const query = useLazyLoadQuery<getAuthorAndPostsQuery>(
    GET_AUTHOR_AND_POSTS_QUERY,
    {
      id: authorId,
    },
    { fetchPolicy: 'store-or-network' }
  );

  return (
    <div className="w-screen min-h-screen flex justify-center relative">
      <div className="flex flex-col w-3/4">
        <div className="w-full flex flex-row">
          <AuthorInfo user={query.user} authorSlug={authorId} />
        </div>
        <AuthorPosts posts={query.user.posts} />
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
