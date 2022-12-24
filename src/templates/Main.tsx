import type { FC } from 'react';

type TProps = {
  children: React.ReactNode;
};

const Main: FC<TProps> = ({ children }) => {
  return (
    <div className="grid h-screen grid-cols-[300px,1fr]">
      {/* sidebar */}
      <div className="bg-base-200"></div>
      {/* content */}
      <div className="w-full overflow-y-auto px-9 py-10">{children}</div>
    </div>
  );
};

export default Main;
