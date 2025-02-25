import { Circle, Pencil, SquareCheckBig, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ITask } from '../../../shared';
import DialogWrapper from '../../../shared/components/DialogWrapper/DialogWrapper';
import { TooltipWrapper } from '../../../shared/components/TooltipWrapper/TooltipWrapper';
import { useTasksStore } from '../store/taskStore';
import CompletedTaskForm from './CompletedTaskForm';
import DeleteTaskForm from './DeleteTaskForm';
import TaskEditForm from './EditTaskForm';
import Task from './Task';

const TaskItem = (task: ITask) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [completedDialogOpen, setCompletedDialogOpen] = useState(false);

  const { id, title, description, createdAt, completed } = task;

  const { currentTask, setCurrentTask } = useTasksStore();

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
              <div
                className="text-green-500 flex gap-0.15 items-center mt-2"
                onClick={() => {
                  setCurrentTask(task);
                  setCompletedDialogOpen(true);
                }}
              >
                <SquareCheckBig className="h-[14px]" /> completed
              </div>
            ) : (
              <button
                className="mt-4 hover:text-green-500 transition-colors"
                onClick={() => {
                  setCurrentTask(task);
                  setCompletedDialogOpen(true);
                }}
              >
                Set as completed
              </button>
            )}
          </div>

          <div className="flex gap-3 ml-2 items-center mt-2 sm:mt-0">
            <TooltipWrapper
              tooltipTrigger={<Pencil className="h-[18px]" />}
              tooltipContent="Edit Task"
              onClick={() => {
                setCurrentTask(task);
                setEditDialogOpen(true);
              }}
            />

            <TooltipWrapper
              tooltipTrigger={<Trash2 className="h-[18px]" />}
              tooltipTriggerClassName="text-red-300 text-sm"
              tooltipContent="Delete task"
              onClick={() => {
                setCurrentTask(task);
                setDeleteDialogOpen(true);
              }}
            />

            {currentTask && (
              <>
                <DialogWrapper
                  children={<DeleteTaskForm />}
                  dialogTitle="Delete task"
                  open={deleteDialogOpen}
                  setOpen={setDeleteDialogOpen}
                />

                <DialogWrapper
                  children={<TaskEditForm />}
                  dialogTitle="Edit task"
                  open={editDialogOpen}
                  setOpen={setEditDialogOpen}
                />

                <DialogWrapper
                  children={<CompletedTaskForm />}
                  dialogTitle="Edit task"
                  open={completedDialogOpen}
                  setOpen={setCompletedDialogOpen}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
