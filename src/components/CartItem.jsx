import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import useCarts from '../hooks/useCarts';
import formatPrice from '../utils/formatPrice';

const ICON_CLASS =
  'cursor-pointer hover:text-brand hover:scale-105 transition-all';

export default function CartItem({
  product,
  product: { imageUrl, name, option, quantity, price, productId },
}) {
  const navigate = useNavigate();
  const { updateItem, removeItem } = useCarts();

  const handleMinus = () => {
    if (quantity < 2) return;
    updateItem.mutate({
      ...product,
      quantity: quantity - 1,
    });
  };
  const handlePlus = () =>
    updateItem.mutate({ ...product, quantity: quantity + 1 });

  const handleDelete = () => removeItem.mutate(product);

  const handleClick = () => navigate(`/products/${productId}`);

  return (
    <li className='flex justify-between items-center gap-2 md:gap-4 lg:gap-6'>
      <img
        className='w-24 md:w-48 lg:w-72 rounded-lg cursor-pointer'
        src={imageUrl}
        alt={name}
        onClick={handleClick}
      />

      <div className='flex-1 flex justify-between'>
        <div>
          <p className='text-lg'>{name}</p>
          <p className='text-xl font-bold text-brand'>{option.toUpperCase()}</p>
          <p className='text-lg'>{formatPrice(price)}</p>
        </div>

        <div className='flex items-center text-2xl'>
          <AiOutlineMinusSquare
            className={`${ICON_CLASS} mr-1`}
            onClick={handleMinus}
          />
          <span className='select-none'>{quantity}</span>
          <AiOutlinePlusSquare
            className={`${ICON_CLASS} ml-1`}
            onClick={handlePlus}
          />
          <RiDeleteBin5Fill
            className={`${ICON_CLASS} ml-1`}
            onClick={handleDelete}
          />
        </div>
      </div>
    </li>
  );
}
