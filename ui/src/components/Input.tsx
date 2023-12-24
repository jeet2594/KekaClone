import React from 'react';

interface InputProps {
  type: string;
  className: string;
  id: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, className, id, onChange, value, name, placeholder, ...rest },{ ref }) => {
  return (
    <input
      type={type}
      ref={ref}
      className={className}
      id={id}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
