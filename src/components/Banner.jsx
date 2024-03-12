import React from 'react';

export default function Banner() {
  return (
    <section className='relative h-80 flex justify-center items-center'>
      <div className="w-full h-full bg-[url('/image/banner.jpg')] bg-cover contrast-75" />
      <div className='absolute flex flex-col items-center gap-2 text-gray-50 drop-shadow-2xl'>
        <h1 className='text-6xl'>Shop With Us</h1>
        <p className='text-2xl'>Best Products, High Quailty</p>
      </div>
    </section>
  );
}
