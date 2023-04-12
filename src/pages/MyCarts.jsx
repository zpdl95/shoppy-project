import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import { CartItem, Loading, PriceCard } from '../components';
import { Button } from '../components/ui';
import useCarts from '../hooks/useCarts';

const SHIPPING_PRICE = 3000;

export default function MyCarts() {
  const {
    cartsQuery: { data: products, isLoading },
  } = useCarts();

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <>
      {isLoading && <Loading />}

      <section className='flex flex-col p-4 gap-2 md:gap-6 lg:gap-10'>
        <h2 className='text-2xl text-center pb-4 border-b border-gray-300'>
          내 장바구니
        </h2>
        {!hasProducts && (
          <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>
        )}
        {hasProducts && (
          <>
            <ul className='flex flex-col gap-2 px-4 md:px-8 lg:px-12 pb-4 border-b border-gray-300'>
              {products.map((product, index) => (
                <CartItem key={product.productId + index} product={product} />
              ))}
            </ul>
            <div className='flex flex-col md:flex-row justify-between items-center  px-6 md:mx-12 lg:mx-16'>
              <PriceCard text='상품 총액' price={totalPrice} />
              <AiFillPlusCircle className='text-xl md:text-3xl shrink-0' />
              <PriceCard text='배송액' price={SHIPPING_PRICE} />
              <FaEquals className='text-xl md:text-3xl shrink-0' />
              <PriceCard text='총가격' price={totalPrice + SHIPPING_PRICE} />
            </div>
            <Button text='주문하기' />
          </>
        )}
      </section>
    </>
  );
}
