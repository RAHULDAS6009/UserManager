import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-900">{label}</label>}
      <input
        className={`w-full mt-1 p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props} 
      />
    </div>
  );
};
