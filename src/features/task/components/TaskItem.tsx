import { Circle, Pencil, Square, SquareCheckBig, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ITask } from '../../../shared';
import DialogWrapper from '../../../shared/components/DialogWrapper/DialogWrapper';
import { TooltipWrapper } from '../../../shared/components/TooltipWrapper/TooltipWrapper';
import { Button } from '../../../shared/components/ui/button';
import { useTasksStore } from '../store/taskStore';
import CompletedTaskForm from './CompletedTaskForm';
import DeleteTaskForm from './DeleteTaskForm';
import TaskEditForm from './EditTaskForm';
import Task from './Task';

const TaskItem = (task: ITask) => {
  const { title, description, createdAt, completed } = task;
  const { currentTask, setCurrentTask } = useTasksStore();

  const [dialogOpen, setDialogOpen] = useState<null | IDialogType | boolean>(
    null
  );

  type IDialogType = 'deleteTask' | 'editTask' | 'completeTask';

  const handleDialogOpen = (dialogType: IDialogType) => {
    if (dialogType) {
      setCurrentTask(task);
      setDialogOpen(dialogType);
    }
  };

  useEffect(() => {
    if (currentTask) return;
    setDialogOpen(false);
  }, [currentTask]);

  return (
    <div className="bg-task rounded-xl p-2 sm:p-4">
      <div className="flex items-center gap-4">
        <Circle className="h-[14px] hidden sm:block" />

        <div className="sm:flex block justify-between w-full ">
          <div>
            <Task
              title={title}
              description={description}
              createdAt={createdAt}
            />
            {completed ? (
              <Button
                className="text-green-500 flex gap-0.15 items-center mt-4 rounded-sm"
                onClick={() => {
                  handleDialogOpen('completeTask');
                }}
              >
                <SquareCheckBig className="h-[14px] mr-2" /> completed
              </Button>
            ) : (
              <Button
                className="mt-4 text-blue-500 hover:text-green-500"
                onClick={() => {
                  handleDialogOpen('completeTask');
                }}
              >
                <Square className="h-[14px]" /> Set as completed
              </Button>
            )}
          </div>

          <div className="flex gap-3 ml-2 items-center mt-2 sm:mt-0">
            <TooltipWrapper
              tooltipTrigger={<Pencil className="h-[18px]" />}
              tooltipContent="Edit Task"
              onClick={() => {
                handleDialogOpen('editTask');
              }}
            />

            <TooltipWrapper
              tooltipTrigger={<Trash2 className="h-[18px]" />}
              tooltipTriggerClassName="text-red-300 text-sm"
              tooltipContent="Delete task"
              onClick={() => {
                handleDialogOpen('deleteTask');
              }}
            />

            {currentTask && (
              <>
                <DialogWrapper
                  dialogTitle="Delete task"
                  dialogDescription="Are you sure you want to delete this task? This action cannot be undone."
                  open={dialogOpen === 'deleteTask'}
                  setOpen={setDialogOpen}
                >
                  <DeleteTaskForm />
                </DialogWrapper>

                <DialogWrapper
                  dialogTitle="Edit task"
                  dialogDescription="Modify the details of your task."
                  open={dialogOpen === 'editTask'}
                  setOpen={setDialogOpen}
                >
                  <TaskEditForm />
                </DialogWrapper>

                <DialogWrapper
                  dialogTitle="Mark Task as Completed"
                  dialogDescription="Please select the state of your task."
                  open={dialogOpen === 'completeTask'}
                  setOpen={setDialogOpen}
                >
                  <CompletedTaskForm />
                </DialogWrapper>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
