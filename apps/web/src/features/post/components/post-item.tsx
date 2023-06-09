import { FC } from 'react';
import Link from 'next/link';
import { stripMarkdown } from '@scrib/web/utils';
import { ManagePostButtons } from '@scrib/web/features/post';
import { PostNode } from '@scrib/web/features/author/components/author-posts';
import dayjs from 'dayjs';

type PostItemProps = {
  node: PostNode;
  onDelete: () => void;
};

const CONTENT_PREVIEW_LENGTH = 50;

export const PostItem: FC<PostItemProps> = ({ node, onDelete }) => {
  const firstLine = node?.content?.split('\n')[0];
  const content = stripMarkdown(firstLine ?? '');
  const shortContent = (content ?? '').slice(0, CONTENT_PREVIEW_LENGTH);
  const hasMoreContent = content?.length > CONTENT_PREVIEW_LENGTH;
  const isDraft = node.status === 'draft';
  return (
    <Link
      href={isDraft ? `/posts/edit/${node.id}` : `/posts/${node.id}`}
      key={node.id}
    >
      <li
        key={node.id}
        className="min-w-52 px-8 py-2 my-8 border-black border-b"
      >
        <div className="flex justify-between">
          <h3 className="text-2xl">
            {node.title}{' '}
            {isDraft && <span className="text-red-500">(Draft)</span>}
          </h3>
          {node.isAuthor && (
            <ManagePostButtons id={node.id} onDelete={onDelete} />
          )}
        </div>
        <div className="opacity-50 flex justify-between">
          <p>
            {shortContent}
            {hasMoreContent && '...'}
          </p>
          <p>{dayjs(node.createdAt).format('MMMM D, YYYY')}</p>
        </div>
      </li>
    </Link>
  );
};
