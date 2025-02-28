import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ITooltipWrapper {
  tooltipTrigger: ReactNode;
  tooltipContent: string;
  tooltipTriggerClassName?: string;
  onClick?: () => void;
}

export const TooltipWrapper = ({
  tooltipTrigger,
  tooltipContent,
  tooltipTriggerClassName,
  onClick,
}: ITooltipWrapper) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={tooltipTriggerClassName} onClick={onClick}>
          {tooltipTrigger}
        </TooltipTrigger>
        <TooltipContent className="text-white font-semibold">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
