import React from 'react';
import Editor from '@scrib/editor/src';

export default function Post() {
  const [content, setContent] = React.useState('');

  return (
    <div className="w-screen h-min-screen flex justify-center p-4">
      <div className="w-full h-full flex flex-col">
        <h1>Post</h1>
        <div className="w-10/12">
          <Editor
            defaultValue={'tmp'}
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
