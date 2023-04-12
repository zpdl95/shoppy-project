import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm z-30'>
      <ReactLoading type='bars' color='#7F00FF' />
    </div>
  );
}
