import type { FC } from 'react';

import type { TTask } from '@/modules/Main/types';

type TProps = {
  task: TTask;
};
const Task: FC<TProps> = ({ task }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">{task.name}</div>
    </div>
  );
};
export default Task;
