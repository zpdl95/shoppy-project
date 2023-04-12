import React from 'react';

export default function Button({
  type,
  text,
  onClick,
  disabled,
  children,
  style,
  name,
}) {
  return (
    <button
      className={`bg-brand px-4 py-2 rounded-sm text-white hover:brightness-125 hover:drop-shadow-md md:text-lg ${
        disabled && 'cursor-not-allowed'
      } ${style}`}
      name={name}
      type={type ? type : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {children} {text}
    </button>
  );
}
