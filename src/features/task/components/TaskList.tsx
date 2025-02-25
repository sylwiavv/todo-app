import { ITask } from '../../../shared/types/taskTypes';
import { useTasks } from '../hooks/useGetTasks';
import { useTasksStore } from '../store/taskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { isPending, isError } = useTasks();
  const { tasks } = useTasksStore();

  if (isPending) return <p>Loading tasks...</p>;

  if (!tasks?.length && !isError) {
    return <p>No tasks available.</p>;
  }

  if (isError) {
    return <p>An error occurred. Please refresh the page.</p>;
  }

  return (
    <>
      {tasks.map((task: ITask) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </>
  );
};

export default TaskList;
