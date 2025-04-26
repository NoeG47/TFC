import React, { useState } from "react";
import Menu_lateral from "./Menu_lateral";
import { useAuth } from "../login/AuthProvider";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";
import bcrypt from "bcryptjs";

const Header = () => {
  // Variables para abrir el menú
  const [Menu_abierto, setMenu_abierto] = useState(false);

  // Para el modal
  const [modalAbierto, setModalAbierto] = useState(false);

  // Para obtener el usuario logueado
  const { usuario, logout, updateUsuario } = useAuth();
  const navigate = useNavigate();

  // Funciones para abrir/cerrar el menú lateral
  const AbrirMenu = () => setMenu_abierto(!Menu_abierto);
  const CerrarMenu = () => setMenu_abierto(false);

  // Función para abrir/cerrar el modal
  const toggleModal = () => setModalAbierto(!modalAbierto);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    setModalAbierto(false);
    setMenu_abierto(false);
    navigate("/", { replace: true });
  };

  const editarNombre = async () => {
    const { value: nuevoNombre } = await Swal.fire({
      title: "Editar Nombre",
      input: "text",
      inputLabel: "Nuevo nombre",
      inputPlaceholder: "Introduce tu nuevo nombre",
      showCancelButton: true,
    });

    if (nuevoNombre) {
      try {
        await ServicioUsuario.actualizarNombre(usuario.id_usuario, nuevoNombre);
        updateUsuario({
          ...usuario,
          nombre: nuevoNombre,
        });
        Swal.fire("¡Nombre actualizado!", "", "success");
      } catch (error) {
        Swal.fire("Error al actualizar el nombre", error.message, "error");
      }
    }
  };

  const editarContraseña = async () => {
    const { value: nuevaContraseña } = await Swal.fire({
      title: "Editar Contraseña",
      input: "password",
      inputLabel: "Nueva contraseña",
      inputPlaceholder: "Introduce tu nueva contraseña",
      showCancelButton: true,
    });

    if (nuevaContraseña) {
      try {
        const hashedPassword = await bcrypt.hash(nuevaContraseña, 10);
        await ServicioUsuario.actualizarContrasena(
          usuario.id_usuario,
          hashedPassword
        );
        Swal.fire("¡Contraseña actualizada!", "", "success");
      } catch (error) {
        Swal.fire("Error al actualizar la contraseña", error.message, "error");
      }
    }
  };

  return (
    <>
      <header className="w-full flex bg-peach items-center justify-between p-4 shadow-lg">
        {/* Logo + Título */}
        <div className="flex items-center space-x-4">
          <img
            src="../images/logo.ico"
            alt="EasyMeal Logo"
            className="w-16 md:w-20 lg:w-24 h-auto"
          />
          <span className="text-2xl md:text-3xl font-bold text-sage">
            EasyMeal
          </span>
        </div>

        {/* Imagen de perfil + Icono menú */}
        <div className="flex items-center space-x-4">
          {usuario && (
            <img
              src={usuario.imagen_perfil}
              alt="Perfil"
              className="w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white cursor-pointer"
              title={usuario.nombre}
              onClick={toggleModal}
            />
          )}
          <div
            className="w-10 md:w-12 text-5xl cursor-pointer flex items-center justify-center"
            onClick={AbrirMenu}
          >
            ≡
          </div>
        </div>
      </header>

      {/* Menú lateral */}
      <Menu_lateral Abierto={Menu_abierto} Cerrado={CerrarMenu} />

      {/* Modal usuario */}
      {usuario && (
        <Modal isOpen={modalAbierto} onClose={toggleModal}>
          <div className="flex flex-col items-start md:items-center gap-6 w-full">
            <div className="text-3xl font-semibold mb-4 text-center">
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
        </Modal>
      )}
    </>
  );
};

export default Header;
