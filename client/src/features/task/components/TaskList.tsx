import { useGetTasks } from '../../../entities/task/useGetTasks';
import { ITask } from '../../../shared/types/taskTypes';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { data: tasks, isPending, isError } = useGetTasks();
  const data = useGetTasks();

  console.log(tasks, 'data', data);
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
