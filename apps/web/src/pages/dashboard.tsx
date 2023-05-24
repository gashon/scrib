import { getUser } from '@scrib/web/features/auth';
import { redirectToErrorPageSSR } from '@scrib/web/utils';
import AuthorPage from '@scrib/web/pages/authors/[id]';

type Props = {
  authorId: string;
};

export default function DashboardPage({ authorId }: Props) {
  return <AuthorPage authorId={authorId} isDashboard={true} />;
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
