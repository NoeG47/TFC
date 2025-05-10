import React from "react";

const Modal = ({ isOpen, onClose, usuario, editarNombre, editarContraseña, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md m-3">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 md:text-3xl text-xl font-bold text-black"
        >
          ×
        </button>
        {usuario && (
          <div className="flex flex-col items-start md:items-center gap-6 w-full">
            <div className=" text-2xl md:text-3xl font-semibold mb-4 text-center">
              Información del Usuario
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-6 w-full">
              <img
                src={usuario.imagen_perfil}
                alt="Imagen de perfil"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              <div className="text-xl flex flex-col gap-2">
                <p>
                  <strong>Nombre:</strong> {usuario.nombre}
                  <button
                    onClick={editarNombre}
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                </p>
                <p>
                  <strong>Fecha de creación:</strong>{" "}
                  {new Date(usuario.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="text-xl flex flex-col gap-2 w-full -mt-3">
              <p>
                <strong>Correo:</strong> {usuario.correo}
              </p>
              <p>
                <strong>Contraseña:</strong> ********
                <button
                  onClick={editarContraseña}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Editar
                </button>
              </p>
            </div>

            <div className="flex justify-center w-full mt-4">
              <button
                className="bg-burnt-orange text-white px-4 py-2 text-sm md:text-base rounded-xl"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
