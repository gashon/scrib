import { FC } from 'react';

import { Button } from '@scrib/ui/atoms';

export const Navbar: FC = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-16 bg-gray-100">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center">
          <div className="w-16 h-16 bg-gray-300"></div>
          <div className="flex flex-col ml-2">
            <div className="text-sm font-bold">Scrib</div>
            <div className="text-xs">A place to write</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <Button className="h-8 w-24">Auth</Button>
      </div>
    </div>
  );
};
