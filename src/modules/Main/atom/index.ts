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
        order: prev.boards.length,
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
    default:
      throw new Error('unknown action type');
  }
};
export const kanbanReducerAtom = atomWithReducer(initialData, kanbanReducer);

export const isOpenModalCreateBoardAtom = atom(false);
