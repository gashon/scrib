import { FC, MouseEvent } from 'react';
import { useMutation } from 'react-relay';
import { DELETE_POST } from '@scrib/web/features/post';
import {
  errorNotification,
  successNotification,
} from '@scrib/web/lib/notification';
import type { deletePostMutation } from '@scrib/web/__generated__/createPostMutation.graphql';
import { AiOutlineDelete, AiOutlineLoading3Quarters } from 'react-icons/ai';

type DeletePostProps = {
  id: string;
  onClick?: (event: MouseEvent) => void;
};

export const DeletePostButton: FC<DeletePostProps> = ({ id, onClick }) => {
  const [commitDeletePost, isLoading] =
    useMutation<deletePostMutation>(DELETE_POST);

  const onSubmit = async (e: MouseEvent) => {
    if (onClick) onClick(e);

    const variables = {
      id,
    };
    commitDeletePost({
      variables,
      onCompleted: (response, errors) => {
        if (errors) {
          for (const { message } of errors) {
            errorNotification(message);
          }
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
        <button onClick={onSubmit} className="hover:scale-125">
          <AiOutlineDelete />
        </button>
      )}
    </>
  );
};
