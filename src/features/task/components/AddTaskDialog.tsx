// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogOverlay,
//   DialogTitle,
// } from '../../../shared/components/ui/dialog';
// import TaskAddForm from './TaskAddForm';

// interface IAddTaskDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
// }

// export const AddTaskDialog = ({ open, setOpen }: IAddTaskDialogProps) => {
//   const handleClose = () => {
//     console.log('ELOS');
//     setOpen(false);
//   };
//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogOverlay />

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add a New Task</DialogTitle>
//         </DialogHeader>

//         <TaskAddForm />
//       </DialogContent>
//     </Dialog>
//   );
// };
