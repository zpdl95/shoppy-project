import React from 'react';

export default function Notice({ success, fail, required }) {
  return (
    <>
      {success && (
        <p className='absolute w-full h-14 top-0 left-0 flex items-center justify-center font-bold bg-success z-20'>
          ✅ {success}
        </p>
      )}
      {fail && (
        <p className='absolute w-full h-14 top-0 left-0 flex items-center justify-center font-bold bg-fail text-white z-20'>
          🚫 {fail}
        </p>
      )}
      {required && (
        <p className='absolute w-full h-14 top-0 left-0 flex items-center justify-center font-bold bg-required text-white z-20'>
          🆖 {required}
        </p>
      )}
    </>
  );
}
