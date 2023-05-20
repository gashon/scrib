import React from 'react';
import { Helmet } from 'react-helmet-async';
import Editor from '@scrib/editor/src';
import { getPost, viewPost } from '@scrib/web/features/post';
import { IPost } from '@scrib/db/models/post';
import { redirectToErrorPageSSR } from '@scrib/web/utils';
import { NavigationLayout } from '@scrib/web/layouts/navigation';

type Props = {
  post: Partial<IPost>;
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
        <div className="w-screen min-h-screen flex p-36 justify-center">
          <div
            className="w-3/4 h-auto flex flex-col"
            style={{ height: '100%' }}
          >
            <h1 className="text-3xl mb-10 underline font-bold">
              {post.title ?? 'Post'}
            </h1>
            <main className="">
              <Editor readOnly={true} defaultValue={post.content} />
            </main>
          </div>
        </div>
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
