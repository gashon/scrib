import React from 'react';
import Editor from '@scrib/editor/src';
import { useLazyLoadQuery } from 'react-relay';
import { UPDATE_POST } from '@scrib/web/features/post';

export default function Post() {
  const [content, setContent] = React.useState('');

  const query = useLazyLoadQuery(UPDATE_POST, {
    content,
  });

  const handleSave = () => {
    console.log('handleSave');
  };

  return (
    <div className="w-screen h-min-screen flex p-10 justify-center">
      <div className="w-full h-full flex flex-col w-3/4">
        <h1 className="text-3xl mb-10 underline font-bold">Post</h1>
        <div className="">
          <Editor
            defaultValue={''}
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
