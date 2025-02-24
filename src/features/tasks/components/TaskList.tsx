import { Pencil, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../shared/components/ui/tooltip';

const TaskList = () => {
  return (
    <div className="bg-task rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3>Title</h3>
          <p>Desc</p>
        </div>
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pencil />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-red-400">
                <Trash2 />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
