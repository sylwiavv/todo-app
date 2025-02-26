'use client';
import { CalendarCheck, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import TaskAddForm from '../features/task/components/TaskAddForm';
import TaskList from '../features/task/components/TaskList';
import DialogWrapper from '../shared/components/DialogWrapper/DialogWrapper';
import { Button } from '../shared/components/ui/button';
import { Providers } from './providers';

const Home = () => {
  const [open, setOpen] = useState(false);

  const handleOpenAddTaskDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen gap-8 relative my-10">
        <h1 className="flex flex-col items-center justify-center gap-4 mb-4">
          <span className="p-3 rounded-full bg-font text-[#3e3341]">
            <CalendarCheck />
          </span>
          To do list app
        </h1>
        <div className="flex flex-col sm:gap-8 gap-2 bg-[#3e3341] rounded-xl shadow-md min-w-[320px] p-2 sm:p-6 max-w-[710px] ">
          <Providers>
            <Button
              className="fixed rounded-full right-2 bottom-2 sm:right-8 sm:bottom-8 bg-font text-[#3e3341] p-2 hover:bg-font/95"
              onClick={handleOpenAddTaskDialog}
            >
              <CirclePlus className="h-full" />
              <p className="font-semibold pr-1">Add task</p>
            </Button>

            <TaskList />

            <DialogWrapper
              open={open}
              setOpen={setOpen}
              dialogTitle="Add task"
              dialogDescription="Create a new task by providing the necessary details. Add a title, description."
              children={<TaskAddForm setOpen={setOpen} />}
            />
          </Providers>
        </div>
      </main>
    </>
  );
};

export default Home;
