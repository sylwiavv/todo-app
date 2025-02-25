import { JSX } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '../ui/dialog';

interface IDialogWrapperProps {
  open: boolean;
  dialogTitle: string;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
}

const DialogWrapper = ({
  open,
  children,
  dialogTitle,
  setOpen,
}: IDialogWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
