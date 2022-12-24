import { atom, useAtom } from 'jotai';
import type { FC } from 'react';
import { useRef } from 'react';

type TTodo = {
  text: string;
  isDone: boolean;
};
const todoListAtom = atom<TTodo[]>([]);

/* eslint-disable @typescript-eslint/no-use-before-define */
const Board = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todoList, setTodoList] = useAtom(todoListAtom);

  const handleAdd = () => {
    const text = inputRef.current?.value;
    if (text) {
      setTodoList((prev) => [...prev, { text, isDone: false }]);
    }
  };

  return (
    <div className="min-h-[500px] rounded-xl bg-base-200 p-6">
      <div className="mb-5 flex items-center justify-between">
        <h4>Board 1</h4>
      </div>
      <div className="mb-5 flex items-center gap-x-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here"
          className="input w-full"
        />
        <button onClick={handleAdd} className="btn-outline btn-primary btn">
          +
        </button>
      </div>
      <div>
        {todoList.map((item, index) => {
          return <Item key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

const Item: FC<{ item: TTodo }> = ({ item }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">{item.text}</div>
    </div>
  );
};

export default Board;
