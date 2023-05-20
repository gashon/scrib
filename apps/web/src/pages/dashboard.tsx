import { useLazyLoadQuery } from 'react-relay';
import {
  AuthorInfo,
  AuthorPosts,
  SettingsModal,
  GET_AUTHOR_AND_POSTS_QUERY,
} from '@scrib/web/features/author';
import { Helmet } from 'react-helmet-async';
import { getUser } from '@scrib/web/features/auth';
import type { getAuthorAndPostsQuery } from '@scrib/web/__generated__/GetAuthorAndPostsQuery.graphql';
import { redirectToErrorPageSSR } from '@scrib/web/utils';

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
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="w-screen min-h-screen flex justify-center relative">
        <main className="flex flex-col w-3/4">
          <div className="w-full flex flex-row">
            <AuthorInfo user={query.user} authorSlug={authorId} />
          </div>
          <AuthorPosts posts={query.user.posts} />
        </main>

        <div className="fixed left-5 bottom-5">
          <SettingsModal user={query.user} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: user } = await getUser({
    cookie: context.req.headers.cookie,
  });

  if (!user?.data)
    return redirectToErrorPageSSR({
      title: 'Not logged in',
      description: 'You must be logged in to view this page',
      redirect: '/auth',
      retry: false,
    });

  return {
    props: {
      authorId: user.data.id,
    },
  };
}