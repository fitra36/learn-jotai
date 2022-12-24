import type { FC } from 'react';

type TProps = {
  children: React.ReactNode;
};

const Main: FC<TProps> = ({ children }) => {
  return (
    <div className="grid h-screen lg:grid-cols-[300px,1fr]">
      {/* sidebar */}
      <div className="hidden bg-base-200 lg:block"></div>
      {/* content */}
      <div className="h-full w-full overflow-y-auto px-9 py-10">{children}</div>
    </div>
  );
};

export default Main;
