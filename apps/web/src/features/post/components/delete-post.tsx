import React, { FC } from 'react';
import { useMutation } from 'react-relay';
import { Button } from '@scrib/ui/components';
import { DELETE_POST } from '@scrib/web/features/post';
import {
  errorNotification,
  successNotification,
} from '@scrib/web/lib/notification';
import type { deletePostMutation } from '@scrib/web/__generated__/createPostMutation.graphql';
import { AiOutlineDelete, AiOutlineLoading3Quarters } from 'react-icons/ai';

type DeletePostProps = {
  id: string;
};

export const DeletePostButton: FC<DeletePostProps> = ({ id }) => {
  const [commitDeletePost, isLoading] =
    useMutation<deletePostMutation>(DELETE_POST);

  const onSubmit = async () => {
    const variables = {
      id,
    };
    commitDeletePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          errorNotification(errors);
        } else {
          successNotification('Post deleted');
        }
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        <div onClick={onSubmit} className="cursor-pointer hover:scale-125">
          <AiOutlineDelete />
        </div>
      )}
    </>
  );
};
