import { CalendarCheck } from 'lucide-react';
import TaskList from '../features/tasks/components/TaskList';

export default function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center min-h-screen gap-8">
        <h1 className="flex flex-col items-center justify-center gap-4 mb-2">
          <span className="p-3 rounded-full bg-font text-[#3e3341]">
            <CalendarCheck />
          </span>
          To do list app
        </h1>
        <div className="flex flex-col gap-8 bg-[#3e3341] rounded-xl shadow-md min-w-[320px] p-6">
          <TaskList />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </>
  );
}
