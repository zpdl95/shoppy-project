import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className='h-screen flex flex-col justify-center items-center text-brand drop-shadow-2xl font-mono'>
      <h1 className='text-7xl md:text-9xl'>404</h1>
      <h2 className='text-4xl md:text-6xl capitalize opacity-75'>
        page not found
      </h2>
      <h3 className='flex flex-col items-center opacity-50 my-10 font-bold text-sm md:text-xl'>
        <p>We're sorry, the pages you requested could not be found</p>
        <p>Please go back to the homepage</p>
      </h3>
      <button
        className=' bg-brand text-white text-xl md:text-2xl px-10 py-3 rounded-3xl hover:drop-shadow-lg hover:brightness-110 uppercase'
        onClick={() => navigate('/')}
      >
        go home
      </button>
    </section>
  );
}
