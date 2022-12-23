import type { FC } from 'react';

const Main: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="grid h-screen grid-cols-[300px,1fr]">
      {/* sidebar */}
      <div className="bg-base-200">has</div>
      {/* content */}
      <div className="overflow-y-auto px-9 py-10">{children}</div>
    </div>
  );
};

export default Main;
