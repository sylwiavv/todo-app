'use client';
import { CalendarCheck, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import TaskAddForm from '../features/task/components/TaskAddForm';
import TaskList from '../features/task/components/TaskList';
import DialogWrapper from '../shared/components/DialogWrapper/DialogWrapper';
import { TooltipWrapper } from '../shared/components/TooltipWrapper/ index';
import { Providers } from './providers';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpenAddTaskDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen gap-8 relative">
        <h1 className="flex flex-col items-center justify-center gap-4 mb-4">
          <span className="p-3 rounded-full bg-font text-[#3e3341]">
            <CalendarCheck />
          </span>
          To do list app
        </h1>
        <div className="flex flex-col gap-8 bg-[#3e3341] rounded-xl shadow-md min-w-[320px] p-6 ">
          <Providers>
            <TooltipWrapper
              tooltipContent="Add new task"
              tooltipTrigger={<CirclePlus />}
              tooltipTriggerClassName="text-[#3e3341] border-zinc-100 flex items-center gap-3 absolute bottom-8 right-8 bg-font rounded-full p-1"
              onClick={handleOpenAddTaskDialog}
            />

            <TaskList />

            <DialogWrapper
              open={open}
              setOpen={setOpen}
              dialogTitle="Add task"
              children={<TaskAddForm setOpen={setOpen} />}
            />
          </Providers>
        </div>
      </main>
    </>
  );
};

export default Home;
