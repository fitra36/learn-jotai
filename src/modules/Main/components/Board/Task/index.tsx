import type { FC } from 'react';

import DragIcon from '@/modules/common/icons/DragIcon';
import type { TTask } from '@/modules/Main/types';

type TProps = {
  task: TTask;
};
const Task: FC<TProps> = ({ task }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="relative flex">
          <div
            className="absolute -left-7 cursor-grab"
            data-drag="task-handler"
          >
            <DragIcon className="text-white/70" />
          </div>
          <div>{task.name}</div>
        </div>
      </div>
    </div>
  );
};
export default Task;
