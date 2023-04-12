import React from 'react';
import formatPrice from '../utils/formatPrice';

export default function PriceCard({ text, price }) {
  return (
    <div className='w-full md:w-min flex flex-col items-center p-2 md:p-6 lg:p-10 bg-gray-100 text-lg md:text-xl'>
      <p>{text}</p>
      <p className='text-brand font-bold text-xl md:text-2xl'>
        {formatPrice(price)}
      </p>
    </div>
  );
}
