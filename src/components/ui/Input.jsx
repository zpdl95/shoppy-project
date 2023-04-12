import React from 'react';

export default function Input({
  type,
  name,
  value,
  placeholder,
  accept,
  onChange,
  required = true,
}) {
  return (
    <input
      className='outline-none p-3 border-2'
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      accept={accept}
      onChange={onChange}
      required={required}
    />
  );
}
