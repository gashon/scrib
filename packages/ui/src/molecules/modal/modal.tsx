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
import dynamic from 'next/dynamic';
const UndulateSVG = dynamic(() => import('@scrib/ui/svg/undulate'), {
  ssr: false,
});

type Props = {
  triggerButton: ReactNode;
  submitButton?: ReactNode;
  ariaLabelledBy: string;
  ariaDescribedBy: string;
  title: string;
  modalClassName?: string;
  hasBackgroundSVG?: boolean;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  triggerButton,
  submitButton,
  ariaLabelledBy,
  ariaDescribedBy,
  title,
  modalClassName,
  hasBackgroundSVG = true,
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
        <div
          className={`overflow-hidden bg-white rounded w-3/4 p-4 relative ${modalClassName}`}
        >
          {hasBackgroundSVG && (
            <div className="absolute inset-0 opacity-75 z-10">
              <UndulateSVG />
            </div>
          )}
          <div className="w-full flex justify-between z-20">
            <h3 className="text-3xl">{title}</h3>
            <div onClick={handleClose} className="cursor-pointer">
              <AiOutlineClose size={30} />
            </div>
          </div>

          <div className="w-full h-full flex justify-center py-4 z-20">
            {children}
          </div>

          <div className="absolute bottom-4 right-4 z-20">{submitButton}</div>
        </div>
      </ModalUI>
    </>
  );
};
