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
      type: 'add-todo';
      payload: {
        name: string;
        boardId: string;
      };
    }
  | {
      type: 'delete-todo';
      payload: {
        id: string;
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
