import { ITask } from '../../../shared';

type ITaskProps = Pick<ITask, 'createdAt' | 'title' | 'description'>;

const Task = ({ createdAt, title, description }: ITaskProps) => {
  return (
    <div>
      <p className="text-sm mb-2">{new Date(createdAt).toLocaleDateString()}</p>
      <h3 className="uppercase text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Task;
