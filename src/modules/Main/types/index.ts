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
    };

// get type of action type from TAction
export type TActionType = TAction['type'];

export type TTask = {
  id: string;
  name: string;
  order: number;
};

export type TBoard = {
  id: string;
  name: string;
  order: number;
  tasks: TTask[];
};

export type TKanban = {
  boards: TBoard[];
};
