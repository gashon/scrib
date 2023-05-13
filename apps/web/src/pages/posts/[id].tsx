import React from 'react';
import Editor from '@scrib/editor/src';
import { getPost } from '@scrib/web/features/post';
import { IPost } from '@scrib/db/models/post';

type Props = {
  post: Partial<IPost>;
};

export default function Post({ post }: Props) {
  return (
    <div className="w-screen h-min-screen flex p-10 justify-center">
      <div className="w-full h-full flex flex-col w-3/4">
        <h1 className="text-3xl mb-10 underline font-bold">
          {post.title ?? 'Post'}
        </h1>
        <div className="">
          <Editor readOnly={true} defaultValue={post.content} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const post = await getPost(id);

  return {
    props: {
      post,
    },
  };
}
