import React from 'react';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';

export default function ProductCard({
  product: { category, name, price, imageUrl, productId },
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${productId}`);
  };

  return (
    <li className='rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform'>
      <img
        src={imageUrl}
        alt={name}
        onClick={handleClick}
        className='cursor-pointer'
      />
      <div className='mt-2 px-2 text-lg'>
        <h3 className='font-semibold'>{name}</h3>
        <p className='px-1 underline font-light'>{formatPrice(price)}</p>
      </div>
      <p className='px-2 mb-2 text-gray-500'>{category}</p>
    </li>
  );
}
