import { FC, MouseEvent } from 'react';
import Link from 'next/link';
import { DeletePostButton } from '@scrib/web/features/post';

type ManagePostProps = {
  id: string;
};

export const ManagePostButtons: FC<ManagePostProps> = ({ id }) => {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row justify-center items-center gap-2 mb-2"
    >
      <div className="cursor-pointer hover:scale-125">
        <Link href={`/posts/edit/${id}`}>Edit</Link>
      </div>
      <DeletePostButton onClick={handleClick} id={id} />{' '}
    </div>
  );
};
