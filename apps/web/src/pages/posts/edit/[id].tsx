import React from 'react';
import Editor from '@scrib/editor/src';
import { useMutation } from 'react-relay';
import { UPDATE_POST } from '@scrib/web/features/post';
import { getPost } from '@scrib/web/features/post';
import { IPost } from '@scrib/db/models/post';
import {
  errorNotification,
  successNotification,
} from '@scrib/web/lib/notification';
import type {
  updatePostMutation,
  updatePostMutation$variables,
} from '@scrib/web/__generated__/updatePostMutation.graphql';
import { Button } from '@scrib/ui/atoms';

type Props = {
  post: Partial<IPost>;
};

// todo auto save
export default function Post({ post: loadedPost }: Props) {
  const [post, setPost] = React.useState<Partial<IPost> & { saved: boolean }>({
    ...loadedPost,
    saved: true,
  });

  const [commitUpdatePost] = useMutation<updatePostMutation>(UPDATE_POST);

  const handleChange = (
    key: keyof updatePostMutation$variables,
    value: string
  ) => {
    setPost((p) => ({ ...p, [key]: value, saved: false }));
  };

  const handleSave = (status?: IPost['status']) => {
    const variables = {
      id: loadedPost._id,
      title: post.title,
      content: post.content,
      status: status || post.status,
    };
    console.log('SENDING', status);

    commitUpdatePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          errorNotification(errors);
        } else {
          if (status) {
            successNotification('Post status updated');
          } else {
            successNotification('Post saved successfully!');
          }
          setPost((p) => ({
            ...p,
            ...(response?.updatePost ?? {}),
            saved: true,
          }));
        }
      },
    });
  };

  console.log('RERENDINGER', post.status);

  return (
    <div className="w-screen min-h-screen flex p-36 justify-center">
      <div className="w-3/4 h-auto flex flex-col" style={{ height: '100%' }}>
        <div className="absolute top-5 right-5">
          {post.status !== 'published' ? (
            <Button onClick={() => handleSave('published')}>Publish</Button>
          ) : (
            <Button onClick={() => handleSave('draft')}>Revert to Draft</Button>
          )}
        </div>

        <main
          style={{
            minHeight: '70vh',
          }}
        >
          <input
            id="post-title"
            className="w-full mb-10 text-3xl font-bold underline"
            onChange={(e) => handleChange('title', e.target.value)}
            value={post.title}
            style={{ outline: 'none', boxShadow: 'none' }}
            placeholder="Title..."
          />

          <Editor
            defaultValue={post.content}
            onSave={() => handleSave()}
            placeholder="Write something awesome..."
            onChange={(getValue) => {
              handleChange('content', getValue());
            }}
          />
        </main>
      </div>

      <div className="absolute bottom-5 right-5">
        {post.saved ? (
          <p className="opacity-75">Saved</p>
        ) : (
          <button className="underline" onClick={() => handleSave()}>
            Unsaved
          </button>
        )}
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
