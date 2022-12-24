import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

import { isOpenModalCreateBoardAtom, kanbanReducerAtom } from '../atom';
import Board from './Board';

const DynamicModalCreateBoard = dynamic(() => import('./Board/ModalCreate'));

const Kanban = () => {
  const [kanban] = useAtom(kanbanReducerAtom);
  const [isOpenModalCreateBoard, setIsOpenModalCreateBoard] = useAtom(
    isOpenModalCreateBoardAtom
  );

  return (
    <div className="h-full w-full">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl">Kanban</h1>
        <button
          className="btn-primary btn-sm btn"
          onClick={() => {
            setIsOpenModalCreateBoard(true);
          }}
        >
          +
        </button>
      </div>
      <div className="flex h-full w-full gap-x-2 overflow-x-scroll">
        {kanban.boards.map((board) => (
          <div key={board.id}>
            <Board board={board} />
          </div>
        ))}
      </div>
      {isOpenModalCreateBoard && <DynamicModalCreateBoard />}
    </div>
  );
};

export default Kanban;
