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

        {/* Contenedor de la imagen de perfil y el menú */}
        <div className="flex items-center space-x-4">
          {/* Imagen de usuario (solo si está logueado) */}
          {usuario && (
            <img
              src={usuario.imagen_perfil}
              alt="Perfil"
              className="w-10 md:w-15 h-10 md:h-15 rounded-full border-2 border-white cursor-pointer"
              title={usuario.nombre}
              onClick={toggleModal}
            />
          )}

          {/* Icono de hamburguesa */}
          <div className="w-10 md:w-16 h-15 text-5xl cursor-pointer" onClick={AbrirMenu}>
            ≡
          </div>
        </div>
      </header>

      {/* Llamamos al componente del menú lateral */}
      <Menu_lateral Abierto={Menu_abierto} Cerrado={CerrarMenu} />

      {/* Modal para mostrar la información del usuario */}
      {usuario && (
        <Modal isOpen={modalAbierto} onClose={toggleModal}>
          <div className="flex flex-col items-center gap-6">
            <div className="text-3xl font-semibold mb-4 text-center p">Información del Usuario</div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
              {/* Imagen de perfil */}
              <img
                src={usuario.imagen_perfil}
                alt="Imagen de perfil"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
              <div className="text-xl flex flex-col gap-2">
                <p>
                  <strong>Nombre:</strong> {usuario.nombre}
                </p>
                <p>
                  <strong>Fecha de creación:</strong>
                  {new Date(usuario.fechaCreacion).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="text-xl flex flex-col gap-2 w-full">
              <p>
                <strong>Correo:</strong> {usuario.correo}
              </p>
              <p>
                <strong>Contraseña:</strong> ********
              </p>
            </div>

            <div className="flex justify-center w-full mt-4">
              <button
                className="bg-burnt-orange text-white px-6 py-2 rounded-xl"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
