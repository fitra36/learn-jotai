import { useAtom } from 'jotai';
import type { FC } from 'react';

import TextEditable from '@/modules/common/components/TextEditable';
import DragIcon from '@/modules/common/icons/DragIcon';
import { kanbanReducerAtom } from '@/modules/Main/atom';
import type { TTask } from '@/modules/Main/types';

type TProps = {
  boardId: string;
  task: TTask;
};
const Task: FC<TProps> = ({ boardId, task }) => {
  const [, reducer] = useAtom(kanbanReducerAtom);

  const handleRenameTask = (text: string) => {
    if (text?.length <= 0) return;

    reducer({
      type: 'rename-task',
      payload: {
        taskId: task.id,
        boardId,
        newName: text,
      },
    });
  };

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
          <div className="max-w-full">
            <TextEditable text={task.name} onSetText={handleRenameTask} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Task;
