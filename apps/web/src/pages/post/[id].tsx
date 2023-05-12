import React from 'react';
import Editor from '@scrib/editor/src';
import { useMutation } from 'react-relay';
import { UPDATE_POST } from '@scrib/web/features/post';
import { getPost } from '@scrib/web/features/post';
import { IPost } from '@scrib/db/models/post';

type Props = {
  post: Partial<IPost>;
};

export default function Post({ post }: Props) {
  const [content, setContent] = React.useState(post.content);

  const [commitUpdatePost, isUpdating] = useMutation(UPDATE_POST);

  const handleSave = () => {
    const variables = {
      id: '<post_id>', // Replace with the actual post ID
      title: '<post_title>', // Replace with the actual post title
      content: content,
    };

    commitUpdatePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          console.error('Error updating post:', errors);
          // Handle error case
        } else {
          console.log('Post updated successfully:', response.updatePost);
          // Handle success case
        }
      },
    });
  };

  return (
    <div className="w-screen h-min-screen flex p-10 justify-center">
      <div className="w-full h-full flex flex-col w-3/4">
        <h1 className="text-3xl mb-10 underline font-bold">Post</h1>
        <div className="">
          <Editor
            defaultValue={content}
            onSave={handleSave}
            placeholder="Write something awesome..."
            onChange={(getValue) => {
              console.log(getValue());
              setContent(getValue());
            }}
          />
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
