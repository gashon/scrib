import React, { FC } from 'react';
import { useMutation } from 'react-relay';
import { Button, Modal } from '@scrib/ui/components';
import { CREATE_POST } from '@scrib/web/features/post';
import { errorNotification } from '@scrib/web/lib/notification';
import { useRouter } from 'next/router';
import type { createPostMutation } from '@scrib/web/__generated__/createPostMutation.graphql';

export const CreatePostButton: FC = () => {
  const [commitCreatePost, isLoading] =
    useMutation<createPostMutation>(CREATE_POST);
  const router = useRouter();

  const onSubmit = async () => {
    const variables = {
      title: 'Title: Draft Post',
    };
    commitCreatePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          errorNotification(errors);
        } else {
          router.push(`/posts/edit/${response.createPost.id}`);
        }
      },
    });
  };

  return (
    <>
      <Modal
        triggerButton={<Button>Create Post</Button>}
        submitButton={
          <Button loading={isLoading} className="" onClick={onSubmit}>
            Create Post
          </Button>
        }
        title="Create Post"
        ariaLabelledBy="create-post-modal-title"
        ariaDescribedBy="create-post-modal-description"
        modalClassName="w-fit h-48"
      >
        <p className="text-xl">Are you sure you want to create a new post?</p>
      </Modal>
    </>
  );
};
