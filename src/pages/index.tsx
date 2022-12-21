import Board from '@/components/Main';

/* eslint-disable @typescript-eslint/no-use-before-define */
const Index = () => {
  return (
    <div className="grid h-screen grid-cols-[300px,1fr]">
      {/* sidebar */}
      <div className="bg-base-200">has</div>
      {/* content */}
      <div className="overflow-y-auto px-9 py-10">
        {/* header */}
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-xl">Kanban</h1>
          <button className="btn-primary btn-sm btn">+</button>
        </div>
        {/* body */}
        <div className="grid grid-cols-[400px]">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Index;
