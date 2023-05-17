import { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { DeletePostButton } from '@scrib/web/features/post';

type ManagePostProps = {
  id: string;
  onDelete: () => void;
};

export const ManagePostButtons: FC<ManagePostProps> = ({ id, onDelete }) => {
  const handleDelete = (event: MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={(event: MouseEvent) => event.stopPropagation()}
      className="flex flex-row justify-center items-center gap-2 mb-2"
    >
      <div className="cursor-pointer hover:scale-125">
        <Link href={`/posts/edit/${id}`}>Edit</Link>
      </div>
      <DeletePostButton onClick={handleDelete} id={id} />{' '}
    </div>
  );
};
