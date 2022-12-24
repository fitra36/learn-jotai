import type { FC } from 'react';
import { useRef } from 'react';

import type { TBoard } from '../../types';

type TProps = {
  board: TBoard;
};

const Board: FC<TProps> = ({ board }) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
        <button className="btn-outline btn-primary btn">+</button>
      </div>
      <div></div>
    </div>
  );
};

export default Board;
