import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface ITooltipWrapper {
  tooltipTrigger: ReactNode;
  tooltipContent: string;
  tooltipTriggerClassName?: string;
}

export const TooltipWrapper = ({
  tooltipTrigger,
  tooltipContent,
  tooltipTriggerClassName,
}: ITooltipWrapper) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={tooltipTriggerClassName}>
          {tooltipTrigger}
        </TooltipTrigger>
        <TooltipContent className="text-white font-semibold">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
