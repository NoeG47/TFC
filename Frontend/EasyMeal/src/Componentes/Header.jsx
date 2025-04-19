import React, { useState } from "react";
import Menu_lateral from "./Menu_lateral";
import { useAuth } from "../login/AuthProvider";
import Modal from "./Modal";

const Header = () => {
  // Variables para abrir el menú
  const [Menu_abierto, setMenu_abierto] = useState(false);

  // Para el modal
  const [modalAbierto, setModalAbierto] = useState(false);

  // Para obtener el usuario logueado
  const { usuario, logout } = useAuth();

  // Funciones para abrir/cerrar el menú lateral
  const AbrirMenu = () => {
    setMenu_abierto(!Menu_abierto);
  };

  const CerrarMenu = () => {
    setMenu_abierto(false);
  };

  // Función para abrir/cerrar el modal
  const toggleModal = () => {
    setModalAbierto(!modalAbierto);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();  // Llama al método de logout del contexto
    setModalAbierto(false); // Cierra el modal después de cerrar sesión
    setMenu_abierto(false); // Cierra el menú si está abierto
  };

  return (
    <>
      <header className="w-full flex bg-peach items-center justify-between p-4 shadow-lg">
        <div>
          <img
            src="../images/logo.ico"
            alt="EasyMeal Logo"
            className="w-12 md:w-16 lg:w-20 h-auto"
          />
        </div>

        {usuario && (
          <img
            src={usuario.imagen_perfil}
            alt="Perfil"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            title={usuario.nombre}
            onClick={toggleModal}
          />
        )}

        <div className="text-2xl md:text-3xl lg:text-4xl cursor-pointer" onClick={AbrirMenu}>
          ≡
        </div>
      </header>

      {/* Llamamos al componente del menú lateral */}
      <Menu_lateral Abierto={Menu_abierto} Cerrado={CerrarMenu} />

      {/* Modal para mostrar la información del usuario */}
      {usuario && (
        <Modal isOpen={modalAbierto} onClose={toggleModal}>
          <div className="text-xl font-semibold mb-4">Información del Usuario</div>
          <div className="mb-2">
            <strong>Nombre:</strong> {usuario.nombre}
          </div>
          <div className="mb-2">
            <strong>Correo:</strong> {usuario.correo}
          </div>
          <div className="mb-2">
            <strong>Fecha de creación:</strong> {new Date(usuario.fechaCreacion).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <strong>Imagen de perfil:</strong>
            <img
              src={usuario.imagen_perfil}
              alt="Imagen de perfil"
              className="w-20 h-20 rounded-full border-2 border-gray-300 mt-2"
            />
          </div>

          {/* Botón de cerrar sesión dentro del modal */}
          <button
            className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </Modal>
      )}
    </>
  );
};

export default Header;
