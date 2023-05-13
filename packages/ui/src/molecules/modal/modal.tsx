import {
  FC,
  ReactNode,
  isValidElement,
  useState,
  PropsWithChildren,
  useCallback,
} from 'react';
import { Modal as ModalUI, Box } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  triggerButton: ReactNode;
  submitButton?: ReactNode;
  ariaLabelledBy: string;
  ariaDescribedBy: string;
  title: string;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  triggerButton,
  submitButton,
  ariaLabelledBy,
  ariaDescribedBy,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  if (!isValidElement(children)) {
    throw new Error('Modal must have valid children');
  }

  return (
    <>
      <div className="w-auto h-auto" onClick={handleOpen}>
        {triggerButton}
      </div>

      <ModalUI
        open={open}
        onClose={handleClose}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="bg-white rounded w-3/4 p-4 relative">
          <div className="w-full flex justify-between">
            <h3 className="text-3xl">{title}</h3>
            <div onClick={handleClose} className="cursor-pointer">
              <AiOutlineClose size={30} />
            </div>
          </div>

          {children}

          <div className="absolute bottom-4 right-4">{submitButton}</div>
        </div>
      </ModalUI>
    </>
  );
};
