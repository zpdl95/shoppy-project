import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCarts from '../hooks/useCarts';

export default function CartStatus() {
  const {
    cartsQuery: { data: products },
  } = useCarts();

  return (
    <div className='relative'>
      <AiOutlineShoppingCart />
      {products?.length > 0 && (
        <>
          <p className='absolute -top-2 -right-2 text-xs w-5 h-5  text-white bg-brand rounded-full flex justify-center items-center'>
            {products.length}
          </p>
          <p className='absolute -top-2 -right-2 text-xs w-5 h-5  text-white bg-brand rounded-full flex justify-center items-center animate-ping opacity-75' />
        </>
      )}
    </div>
  );
}
