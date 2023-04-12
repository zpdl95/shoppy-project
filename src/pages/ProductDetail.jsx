import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatPrice from '../utils/formatPrice';
import { Button } from '../components/ui';
import useCarts from '../hooks/useCarts';
import { Loading, Notice } from '../components';
import useProducts from '../hooks/useProducts';
import { FaAngleRight } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import { useAuthContext } from '../context/AuthContext';

const NOTICE_TIME = 1000;

export default function ProductDetail() {
  const [selected, setSelected] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [fail, setFail] = useState();
  const [required, setRequired] = useState();
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    productsQuery: { data: products, isLoading },
  } = useProducts();
  const product = products?.find((product) => product.productId === productId);
  const { addItem } = useCarts();
  const { user } = useAuthContext();

  const handleChange = (e) => setSelected(e.target.value);

  const handleAddClick = () => {
    if (!selected) {
      setRequired('옵션을 선택해 주세요.');
      setTimeout(() => setRequired(null), NOTICE_TIME);
      return;
    }
    setIsUploading(true);
    const { imageUrl, name, price } = product;
    const p = {
      productId,
      imageUrl,
      name,
      price,
      option: selected,
      quantity: 1,
    };
    addItem.mutate(p, {
      onSuccess: () => {
        setSuccess('제품이 장바구니에 추가되었습니다.');
        setTimeout(() => setSuccess(null), NOTICE_TIME);
      },
      onError: (error) => {
        setFail(error);
        setTimeout(() => setFail(null), NOTICE_TIME);
      },
      onSettled: () => setTimeout(() => setIsUploading(false), NOTICE_TIME),
    });
  };

  const handleEditClick = () => {
    navigate(`/products/${product.productId}/edit`, {
      state: { product },
    });
  };

  return (
    <>
      {success && <Notice success={success} />}
      {fail && <Notice fail={fail} />}
      {required && <Notice required={required} />}
      {isLoading && <Loading />}

      {product && (
        <section className='p-4'>
          <p className='flex items-center mx-10 mb-4 text-gray-500'>
            <FaAngleRight />
            {product.category}
          </p>
          <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
            <div className='w-full'>
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className='w-full flex flex-col'>
              <header className='flex justify-between'>
                <h2 className='text-3xl font-bold py-2'>{product.name}</h2>
                {user?.isAdmin && (
                  <Button
                    text='Edit'
                    style='flex items-center gap-2'
                    onClick={handleEditClick}
                  >
                    <CiEdit />
                  </Button>
                )}
              </header>
              <p className='text-2xl font-bold py-2 border-b border-gray-400'>
                {formatPrice(product.price)}
              </p>
              <p className='text-lg py-4'>{product.description}</p>
              <div className='flex items-center'>
                <label className='text-brand font-bold' htmlFor='size-option'>
                  옵션:
                </label>
                <select
                  className='flex-1 p-2 m-4 border-2 border-dashed border-brand outline-none'
                  name='sizes'
                  id='size-option'
                  value={selected}
                  onChange={handleChange}
                >
                  <option value=''>--선택--</option>
                  {product.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                text={isUploading ? '추가중...' : '장바구니에 추가'}
                onClick={handleAddClick}
                disabled={isUploading}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
