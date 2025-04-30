import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      {/*para aplicar la opacidad solo al fondo y que no quede translúcido también el modal*/}
        <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md m-3">
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
