import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import Editor from '@scrib/editor/src';
import { getPost, viewPost } from '@scrib/web/features/post';
import { IPost } from '@scrib/db/models/post';
import { IUser } from '@scrib/db/models/user';
import { redirectToErrorPageSSR } from '@scrib/web/utils';
import { NavigationLayout } from '@scrib/web/layouts/navigation';
import { ScrollProgressBar } from '@scrib/ui/components';
const RandomRepeatingSVGBackground = dynamic(
  () => import('@scrib/web/components/random-svgs'),
  {
    ssr: false,
  }
);

type Props = {
  post: Partial<IPost> & {
    created_by?: Partial<IUser>;
  };
};

export default function Post({ post }: Props) {
  return (
    <>
      <Helmet>
        <title>{post.title ?? 'Post'}</title>
        <meta name="description" content={'Blog Post'} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={'Blog Post'} />
      </Helmet>

      <NavigationLayout>
        <div className="overflow-hidden w-screen min-h-screen flex p-24 justify-center relative">
          <RandomRepeatingSVGBackground />

          <div
            className="z-20 w-10/12 lg:w-3/4 h-auto flex flex-col"
            style={{
              height: '100%',
            }}
          >
            <h1 className="text-3xl underline font-bold mb-2 lg:mb-4">
              {post.title ?? 'Post'}
            </h1>
            <Link
              href={`/authors/${post.created_by._id}`}
              className="lg:fixed lg:left-5 lg:bottom-0"
            >
              <span className="text-xl">
                {post.created_by?.first_name} {post.created_by?.last_name}
              </span>
              <p className="opacity-50 mb-10">
                {Math.round(post.reading_time / 60)} min read
              </p>
            </Link>
            <main className="w-full">
              <Editor readOnly={true} defaultValue={post.content} />
            </main>
          </div>
        </div>
        <ScrollProgressBar />
      </NavigationLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const [postSettlement] = await Promise.allSettled([
    getPost(id),
    viewPost(id),
  ]);

  const post =
    postSettlement.status === 'fulfilled' ? postSettlement.value : null;

  if (!post)
    return redirectToErrorPageSSR({
      title: 'Post not found',
      description: 'The post you are looking for does not exist',
      redirect: context.resolvedUrl,
      retry: true,
    });

  return {
    props: {
      post,
    },
  };
}
