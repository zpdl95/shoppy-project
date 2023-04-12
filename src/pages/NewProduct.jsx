import React, { useState } from 'react';
import { uploadImage } from '../api/cloudinary';
import { Button, Input } from '../components/ui';
import useProducts from '../hooks/useProducts';
import { Notice } from '../components';

export default function NewProduct() {
  const [formProduct, setFormProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const { addOrUpdateProduct } = useProducts();

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
    setIsUploading(true);

    uploadImage(file) //
      .then((url) => {
        addOrUpdateProduct.mutate(
          { formProduct, url },
          {
            onSuccess: () => {
              setSuccess('성공적으로 제품이 추가되었습니다.');
              setTimeout(() => {
                setSuccess(null);
              }, 1000);
              setFormProduct({});
              setFile(null);
              e.target[0].value = null;
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <>
      {success && <Notice success={success} />}

      <section className='px-4'>
        <h2 className='text-center text-3xl font-bold p-4'>새로운 제품 등록</h2>
        {file && (
          <img
            className='h-96 mx-auto m-5'
            src={URL.createObjectURL(file)}
            alt='local file'
          />
        )}
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <Input
            type='file'
            name='file'
            accept='image/*'
            onChange={handleChange}
          />
          <Input
            type='text'
            name='name'
            placeholder='제품명'
            value={formProduct.name ?? ''}
            onChange={handleChange}
          />
          <Input
            type='number'
            name='price'
            placeholder='가격'
            value={formProduct.price ?? ''}
            onChange={handleChange}
          />
          <Input
            type='text'
            name='category'
            placeholder='카테고리'
            value={formProduct.category ?? ''}
            onChange={handleChange}
          />
          <Input
            type='text'
            name='description'
            placeholder='제품 설명'
            value={formProduct.description ?? ''}
            onChange={handleChange}
          />
          <Input
            type='text'
            name='options'
            placeholder='옵션명(콤마(,)로 구분)'
            required={false}
            value={formProduct.options ?? ''}
            onChange={handleChange}
          />
          <Button
            text={isUploading ? '등록중...' : '제품 등록하기'}
            disabled={isUploading}
          />
        </form>
      </section>
    </>
  );
}
