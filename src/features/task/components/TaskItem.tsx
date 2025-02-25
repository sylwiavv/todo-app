import { Circle, Pencil, SquareCheckBig, Trash2 } from 'lucide-react';
import { TooltipWrapper } from '../../../shared/components/TooltipWrapper/TooltipWrapper';
import { ITask } from '../../../shared/types/taskTypes';

const TaskItem = (task: ITask) => {
  const { id, title, description, createdAt, completed } = task;

  return (
    <div className="bg-task rounded-xl p-4">
      <div className="flex items-center gap-4">
        <Circle className="h-[14px]" />

        <div className="flex justify-between w-full">
          <div>
            <p className="text-sm mb-2">{createdAt}</p>
            <h3 className="uppercase text-xl font-bold">{title}</h3>
            <p>{description}</p>
            {completed ? (
              <p className="text-green-500 flex gap-0.15 items-center mt-2">
                <SquareCheckBig className="h-[14px]" /> completed
              </p>
            ) : (
              <button className="mt-4 hover:text-green-500 transition-colors">
                Set as completed
              </button>
            )}
          </div>

          <div className="flex gap-3 ml-2">
            <TooltipWrapper
              tooltipTrigger={<Pencil className="h-[18px]" />}
              tooltipContent="Edit Task"
            />

            <TooltipWrapper
              tooltipTrigger={<Trash2 className="h-[18px]" />}
              tooltipTriggerClassName="text-red-300 text-sm"
              tooltipContent="Remove task"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
