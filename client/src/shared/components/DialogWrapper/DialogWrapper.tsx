import { JSX } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '../ui/dialog';

interface IDialogWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
  dialogTitle: string;
  dialogDescription: string;
}

const DialogWrapper = ({
  open,
  children,
  dialogTitle,
  setOpen,
  dialogDescription,
}: IDialogWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
