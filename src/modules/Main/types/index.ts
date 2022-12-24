// conditional payload based on action type
export type TAction =
  | {
      type: 'add-board';
      payload: {
        name: string;
      };
    }
  | {
      type: 'delete-board';
      payload: {
        id: string;
      };
    }
  | {
      type: 'reorder-board';
      payload: {
        fromIndex: number;
        toIndex: number;
      };
    }
  | {
      type: 'add-task';
      payload: {
        name: string;
        boardId: string;
      };
    }
  | {
      type: 'delete-task';
      payload: {
        id: string;
        boardId: string;
      };
    }
  | {
      type: 'reorder-task';
      payload: {
        fromIndex: number;
        toIndex: number;
        boardId: string;
      };
    };

// get type of action type from TAction
export type TActionType = TAction['type'];

export type TTask = {
  id: string;
  name: string;
};

export type TBoard = {
  id: string;
  name: string;
  tasks: TTask[];
};

export type TKanban = {
  boards: TBoard[];
};
