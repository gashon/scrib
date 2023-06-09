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
import { uploadImage } from '@scrib/web/utils';
import { NavigationLayout } from '@scrib/web/layouts/navigation';

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

    commitUpdatePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          for (const { message } of errors) {
            errorNotification(message);
          }
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

  return (
    <NavigationLayout>
      <div className="w-screen min-h-screen flex p-36 justify-center">
        <div className="w-3/4 h-auto flex flex-col" style={{ height: '100%' }}>
          <div className="absolute top-5 right-5">
            {post.status !== 'published' ? (
              <Button onClick={() => handleSave('published')}>Publish</Button>
            ) : (
              <Button onClick={() => handleSave('draft')}>
                Revert to Draft
              </Button>
            )}
          </div>

          <main
            style={{
              minHeight: '70vh',
            }}
            className="w-full"
          >
            <input
              id="post-title"
              className="w-10/12 lg:w-full mb-10 text-3xl font-bold underline"
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
              uploadImage={async (file) => {
                const { data } = await uploadImage('post', file, {
                  post_id: post._id,
                });
                return data.url;
              }}
            />
          </main>
        </div>

        <div className="fixed bottom-5 right-5">
          {post.saved ? (
            <p className="opacity-75">Saved</p>
          ) : (
            <button className="underline" onClick={() => handleSave()}>
              Unsaved
            </button>
          )}
        </div>
      </div>
    </NavigationLayout>
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
