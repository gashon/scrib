import {
  FC,
  ComponentType,
  isValidElement,
  useState,
  PropsWithChildren,
  useCallback,
} from 'react';
import { Modal as ModalUI } from '@mui/material';

type Props = {
  ButtonComponent: ComponentType;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  ButtonComponent,
}) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setOpen(false), []);

  if (!isValidElement(children)) {
    return null;
  }

  return (
    <>
      <div className="w-auto h-auto" onClick={toggleOpen}>
        <ButtonComponent />
      </div>

      <ModalUI
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {children}
      </ModalUI>
    </>
  );
};
