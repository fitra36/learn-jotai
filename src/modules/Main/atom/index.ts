import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

import type { TAction, TBoard, TKanban } from '../types';
import { uuid } from '../utils';

const initialData: TKanban = {
  boards: [],
};

export const kanbanReducer = (prev: TKanban, action: TAction) => {
  switch (action.type) {
    case 'add-board': {
      const { name } = action.payload;

      const newBoard: TBoard = {
        id: uuid(),
        name,
        tasks: [],
      };

      return {
        ...prev,
        boards: [...prev.boards, newBoard],
      };
    }
    case 'delete-board':
      return {
        ...prev,
        boards: prev.boards.filter((board) => board.id !== action.payload.id),
      };
    case 'add-task': {
      const { name, boardId } = action.payload;

      const newTask = {
        id: uuid(),
        name,
      };

      const newBoards = prev.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: [...board.tasks, newTask],
          };
        }

        return board;
      });

      return {
        ...prev,
        boards: newBoards,
      };
    }

    case 'delete-task': {
      const { id, boardId } = action.payload;

      const newBoards = prev.boards.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== id),
          };
        }

        return board;
      });

      return {
        ...prev,
        boards: newBoards,
      };
    }
    case 'reorder-task': {
      const { fromIndex, toIndex, boardId } = action.payload;

      const newBoards = prev.boards.map((board) => {
        if (board.id === boardId) {
          const tasks = [...board.tasks];
          const item = tasks.splice(fromIndex, 1)[0];
          if (!item) return board;

          tasks.splice(toIndex, 0, item);

          return {
            ...board,
            tasks,
          };
        }

        return board;
      });

      return {
        ...prev,
        boards: newBoards,
      };
    }

    default:
      throw new Error('unknown action type');
  }
};
export const kanbanReducerAtom = atomWithReducer(initialData, kanbanReducer);

export const isOpenModalCreateBoardAtom = atom(false);
