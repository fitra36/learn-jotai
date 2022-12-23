import Board from '@/components/Main';
import type { TPage } from '@/types';

/* eslint-disable @typescript-eslint/no-use-before-define */
const Index: TPage = () => {
  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-xl">Kanban</h1>
        <button className="btn-primary btn-sm btn">+</button>
      </div>
      <div className="flex gap-x-2">
        <Board />
      </div>
    </div>
  );
};

export default Index;
