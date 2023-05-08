import * as React from 'react';
import { Button, Drawer, DrawerProps } from '@scrib/ui/components';

import { useDisclosure } from '../hooks/use-disclosure';

type FormDrawerProps = {
  isDone: boolean;
  triggerButton: React.ReactElement;
  submitButton: React.ReactElement;
  title: string;
  children: React.ReactNode;
  size?: DrawerProps['size'];
  renderFooter?: boolean;
};

export const FormDrawer = ({
  title,
  children,
  isDone,
  triggerButton,
  submitButton,
  size = 'md',
  renderFooter,
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: open })}
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            {renderFooter && (
              <>
                <Button variant="secondary" onClick={close}>
                  Cancel
                </Button>
                {submitButton}
              </>
            )}
          </>
        )}
      >
        {children}
      </Drawer>
    </>
  );
};
