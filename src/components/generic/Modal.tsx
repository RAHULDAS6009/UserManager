import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center pb-3">
          <div>
            {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
            {description && <p className="font-medium text-sm text-gray-400">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 rounded-lg p-2 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
