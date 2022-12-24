import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useRef } from 'react';

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
        type: 'add-todo',
        payload: {
          name: value,
          boardId: board.id,
        },
      });

      inputRef.current.value = '';
    }
  };

  return (
    <div className="inline-block min-h-[300px] w-[400px] rounded-xl bg-base-200 p-6 shadow-lg">
      <div className="mb-5">
        <h4>{board.name}</h4>
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
        {board.tasks.map((task) => (
          <div key={task.id} className="mb-4">
            <Task task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
