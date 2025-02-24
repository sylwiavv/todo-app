import { Circle, Pencil, Trash2 } from 'lucide-react';
import { useTasks } from '../../../entities/task/api';
import { TooltipWrapper } from '../../../shared/components/TooltipWrapper/ index';

interface ITask {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  createdAt: string;
}

const TaskList = () => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;
  return (
    <>
      {tasks.map(({ id, title, completed, description, createdAt }: ITask) => (
        <div className="bg-task rounded-xl p-4">
          <div className="flex items-center gap-4">
            <Circle />

            <div className="flex justify-between w-full">
              <div key={id}>
                <b>{createdAt}</b>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{completed}</p>
              </div>

              <div className="flex gap-3">
                <TooltipWrapper
                  tooltipTrigger={<Pencil />}
                  tooltipContent="Edit Task"
                />

                <TooltipWrapper
                  tooltipTrigger={<Trash2 />}
                  tooltipTriggerClassName="text-red-300"
                  tooltipContent="Remove task"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
