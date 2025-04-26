import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 md:text-3xl text-xl font-bold text-black"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
