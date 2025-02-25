import { useTasks } from '../../../entities/task/api';
import { ITask } from '../../../shared/types/taskTypes';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;

  if (!tasks.length) {
    return <p>No tasks available.</p>;
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
