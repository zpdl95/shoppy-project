import React from 'react';

export default function User({ user }) {
  const { photoURL, displayName } = user;
  return (
    <div className='flex items-center gap-2 shrink-0'>
      <img className='w-10 rounded-full' src={photoURL} alt={displayName} />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
