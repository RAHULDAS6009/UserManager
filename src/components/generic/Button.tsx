import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outlined";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className, ...props }) => {
  const baseStyle = "rounded-lg text-sm px-5 py-2.5 font-medium focus:ring-4 focus:outline-none transition";
  
  const styles = {
    primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
    outlined: "text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-gray-300",
  };

  return (
    <button className={`${baseStyle} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
