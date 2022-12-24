import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import type { DragListViewProps } from 'react-drag-listview';
import ReactDragListView from 'react-drag-listview';

import { isOpenModalCreateBoardAtom, kanbanReducerAtom } from '../atom';
import Board from './Board';

const DynamicModalCreateBoard = dynamic(() => import('./Board/ModalCreate'));

const Kanban = () => {
  const [kanban, reducer] = useAtom(kanbanReducerAtom);

  const [isOpenModalCreateBoard, setIsOpenModalCreateBoard] = useAtom(
    isOpenModalCreateBoardAtom
  );

  const handleDragEnd: DragListViewProps['onDragEnd'] = (
    fromIndex,
    toIndex
  ) => {
    reducer({
      type: 'reorder-board',
      payload: {
        fromIndex,
        toIndex,
      },
    });
  };

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
      <ReactDragListView.DragColumn
        onDragEnd={handleDragEnd}
        nodeSelector="[data-drag='board-node']"
        handleSelector="[data-drag='board-handler']"
      >
        <div className="flex h-full w-full gap-x-5 overflow-x-scroll">
          {kanban.boards.map((board) => (
            <div data-drag="board-node" key={board.id}>
              <Board board={board} />
            </div>
          ))}
        </div>
      </ReactDragListView.DragColumn>
      {isOpenModalCreateBoard && <DynamicModalCreateBoard />}
    </div>
  );
};

export default Kanban;
