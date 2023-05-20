import { FC, ReactNode } from 'react';
import { Navbar } from '@scrib/ui/molecules/navbar';

export const NavigationLayout: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};
