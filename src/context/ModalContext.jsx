import { useState, useRef, useContext, createContext } from 'react';
import { Button } from '../components/ui';

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resoveRef = useRef();

  const openModal = () => {
    setIsModalOpen(true);
    return new Promise((resolve) => {
      resoveRef.current = resolve;
    });
  };

  const closeModal = () => {
    resoveRef.current(false);
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    resoveRef.current(true);
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {isModalOpen && (
        <section className='flex justify-center items-center fixed w-full h-full top-0 left-0 z-50'>
          <div
            className='fixed w-screen h-screen top-0 left-0  bg-slate-800 opacity-70'
            onClick={closeModal}
          ></div>

          <div className='w-96 h-56 flex flex-col justify-center items-center gap-5 absolute bg-white rounded-xl'>
            <h1 className='font-bold text-2xl'>삭제하시겠습니까?</h1>
            <h3 className='text-slate-500'>
              삭제하면 데이터를 복구 할 수 없습니다.
            </h3>
            <div className='w-full flex justify-center gap-2'>
              <Button
                style='bg-white text-black px-12 border'
                text='취소'
                onClick={closeModal}
              />
              <Button style='bg-fail px-12' text='삭제' onClick={onSuccess} />
            </div>
          </div>
        </section>
      )}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
