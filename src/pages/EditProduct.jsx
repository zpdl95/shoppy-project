import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Notice } from '../components';
import { Button, Input } from '../components/ui';
import { useModalContext } from '../context/ModalContext';
import useProducts from '../hooks/useProducts';

export default function EditProduct() {
  const {
    state: { product },
  } = useLocation();
  const [formProduct, setFormProduct] = useState(product);
  const [file, setFile] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const { addOrUpdateProduct, removeProduct } = useProducts();
  const { openModal } = useModalContext();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setFormProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (file) {
      uploadImage(file) //
        .then((url) => {
          addOrUpdateProduct.mutate(
            { formProduct, url },
            {
              onSuccess: () => {
                setSuccess('성공적으로 제품이 업데이트 되었습니다.');
                setTimeout(() => {
                  setSuccess(null);
                  navigate(`/products/${product.productId}`);
                }, 1000);
              },
            }
          );
        })
        .finally(() => setIsUpdating(false));
      return;
    }

    const url = formProduct.imageUrl;
    const options =
      typeof formProduct.options === 'object'
        ? formProduct.options.toString()
        : formProduct.options;
    const product = { ...formProduct, options };
    addOrUpdateProduct.mutate(
      { formProduct: product, url },
      {
        onSuccess: () => {
          setSuccess('성공적으로 제품이 업데이트 되었습니다.');
          setTimeout(() => {
            setSuccess(null);
            setIsUpdating(false);
            navigate(`/products/${product.productId}`);
          }, 1000);
        },
      }
    );
  };

  const handleDeleteClick = async () => {
    await openModal().then((result) => {
      if (!result) return;
      setIsDeleting(true);
      removeProduct.mutate(product.productId, {
        onSuccess: () => {
          setSuccess('성공적으로 제품이 삭제 되었습니다.');
          setTimeout(() => {
            setSuccess(null);
            setIsDeleting(false);
            navigate(`/products`);
          }, 1000);
        },
      });
    });
  };

  if (!product) {
    return <Navigate to={'/'} replace />;
  }
  return (
    <>
      {success && <Notice success={success} />}
      <section className='p-4'>
        <form onSubmit={handleSubmit}>
          <p className='flex items-center mx-10 mb-4 text-gray-500'>
            <Input
              type='text'
              name='category'
              placeholder='카테고리'
              value={formProduct.category}
              onChange={handleChange}
            />
          </p>
          <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
            <div className='w-full flex flex-col'>
              <Input
                type='file'
                name='file'
                accept='image/*'
                required={false}
                onChange={handleChange}
              />
              <img
                src={file ? URL.createObjectURL(file) : formProduct.imageUrl}
                alt={formProduct.name}
              />
            </div>
            <div className='w-full flex flex-col'>
              <h2 className='flex flex-col text-3xl font-bold py-2'>
                <Input
                  type='text'
                  name='name'
                  placeholder='제품명'
                  value={formProduct.name}
                  onChange={handleChange}
                />
              </h2>
              <p className='flex flex-col text-2xl font-bold py-2 border-b border-gray-400'>
                <Input
                  type='number'
                  name='price'
                  placeholder='가격'
                  value={formProduct.price}
                  onChange={handleChange}
                />
              </p>
              <p className='flex flex-col text-lg py-4'>
                <Input
                  type='text'
                  name='description'
                  placeholder='제품 설명'
                  value={formProduct.description}
                  onChange={handleChange}
                />
              </p>
              <div className='flex flex-col mb-5'>
                <Input
                  type='text'
                  name='options'
                  placeholder='옵션명(콤마(,)로 구분)'
                  required={false}
                  value={formProduct.options}
                  onChange={handleChange}
                />
              </div>
              <Button
                name={'update'}
                text={isUpdating ? '업데이트 중...' : '업데이트'}
                style='mb-5'
                disabled={isUpdating}
              />
              <Button
                type={'button'}
                name={'delete'}
                text={isDeleting ? '삭제 중...' : '삭제'}
                style='bg-fail'
                onClick={handleDeleteClick}
                disabled={isDeleting}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
