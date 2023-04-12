import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import Loading from './Loading';

export default function Products() {
  const {
    productsQuery: { data: products, isLoading },
  } = useProducts();

  return (
    <>
      {isLoading && <Loading />}

      {products && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </ul>
      )}
    </>
  );
}
