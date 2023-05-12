import Editor from '@scrib/editor/src';

export default function Post() {
  return (
    <div className="w-screen h-min-screen flex justify-center p-4">
      <div className="w-full h-full flex flex-col">
        <h1>Post</h1>
        <div className="w-10/12">
          <Editor defaultValue="Hello world!" />
        </div>
      </div>
    </div>
  );
}
