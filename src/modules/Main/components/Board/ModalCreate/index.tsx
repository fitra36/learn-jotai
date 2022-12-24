import { useAtom } from 'jotai';
import type { FC } from 'react';
import { useRef } from 'react';

import Modal from '@/modules/common/components/Modal';

import { isOpenModalCreateBoardAtom, kanbanReducerAtom } from '../../../atom';

const ModalCreate: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useAtom(isOpenModalCreateBoardAtom);
  const [, reducer] = useAtom(kanbanReducerAtom);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCreate = () => {
    const name = inputRef.current?.value ?? '';
    reducer({
      type: 'add-board',
      payload: {
        name,
      },
    });
    setIsOpen(false);
  };

  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={handleClose}>
        <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Board name</span>
            </label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type here"
              className="input-bordered input w-full"
            />
          </div>
          <hr className="mt-5 border-t-base-200" />
          <div className="modal-action">
            <button className="btn" onClick={handleCreate}>
              Create
            </button>
            <button className="btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreate;
