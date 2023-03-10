import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useRef } from 'react';
import type { DragListViewProps } from 'react-drag-listview';
import ReactDragListView from 'react-drag-listview';

import TextEditable from '@/modules/common/components/TextEditable';
import DragIcon from '@/modules/common/icons/DragIcon';

import { kanbanReducerAtom } from '../../atom';
import type { TBoard } from '../../types';
import Task from './Task';

type TProps = {
  board: TBoard;
};

const Board: FC<TProps> = ({ board }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, reducer] = useAtom(kanbanReducerAtom);

  const handleAdd = () => {
    const value = inputRef.current?.value;
    if (value) {
      reducer({
        type: 'add-task',
        payload: {
          name: value,
          boardId: board.id,
        },
      });

      inputRef.current.value = '';
    }
  };

  const handleDragEnd: DragListViewProps['onDragEnd'] = (
    fromIndex,
    toIndex
  ) => {
    reducer({
      type: 'reorder-task',
      payload: {
        fromIndex,
        toIndex,
        boardId: board.id,
      },
    });
  };

  const handleChangeBoardName = (text: string) => {
    if (text?.length <= 0) return;

    reducer({
      type: 'rename-board',
      payload: {
        boardId: board.id,
        newName: text,
      },
    });
  };

  return (
    <div className="inline-block min-h-[300px] w-[400px] rounded-xl bg-base-200 p-6 shadow-lg">
      <div className="mb-5 flex items-center">
        <div className="cursor-grab" data-drag="board-handler">
          <DragIcon className="text-white/70" />
        </div>
        <div className="mb-[2px] max-w-full">
          <TextEditable text={board.name} onSetText={handleChangeBoardName} />
        </div>
      </div>
      <div className="mb-5 flex items-center gap-x-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add new task"
          className="input w-full"
        />
        <button onClick={handleAdd} className="btn-outline btn-primary btn">
          +
        </button>
      </div>

      <hr className="mb-5 border-t-base-100" />

      <div>
        <ReactDragListView
          onDragEnd={handleDragEnd}
          nodeSelector="[data-drag='task-node']"
          handleSelector="[data-drag='task-handler']"
        >
          {board.tasks.map((task) => (
            <div key={task.id} data-drag="task-node" className="mb-4">
              <Task boardId={board.id} task={task} />
            </div>
          ))}
        </ReactDragListView>
      </div>
    </div>
  );
};

export default Board;
