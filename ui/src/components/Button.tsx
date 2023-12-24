// Button.tsx
import React from 'react';

interface ButtonProps {
  label: any;
  color?: string;
  className?: string;
  type?: "button" | "submit" | "reset"; // Specify the type prop
  id?: string; // Specify the id prop
  children?: React.ReactNode; // Allow for children components
  onClick?: () => void; // Make the onClick function optional
}

const Button: React.FC<ButtonProps> = ({ label, color, className, type, id, children, onClick }) => {
  const buttonClasses = `btn btn-${color} ${className || ''}`;

  return (
    <button
      className={buttonClasses}
      type={type || "button"} // Default to "button" type if not provided
      id={id}
      onClick={onClick}
    >
      {label}
      {children} {/* Render children components within the button */}
    </button>
  );
};

export default Button;
