import React from "react";
import { useAuth } from "../login/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
const Menu_lateral = ({ Abierto, Cerrado }) => {
  // Variables para abrir el menú
    const [Menu_abierto, setMenu_abierto] = useState(false);
  
    // Para el modal
    const [modalAbierto, setModalAbierto] = useState(false);
  
    // Para obtener el usuario logueado
    const { usuario, logout, updateUsuario } = useAuth();
    const navigate = useNavigate();
  
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
      {/* Fondo oscuro */}
      {Abierto && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={Cerrado}
        ></div>
      )}

      {/* Menú lateral con animación */}
      <nav
        className={`flex flex-col fixed top-0 right-0 h-full bg-white shadow-lg z-50 w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5
          transform transition-transform duration-300 ease-in-out
          ${Abierto ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Botón cerrar */}
        <div
          className="font-bold text-right bg-peach h-24 sm:h-20 md:h-24 lg:h-32 flex items-center justify-end pr-6"
          onClick={Cerrado}
        >
          <button className="text-4xl cursor-pointer">×</button>
        </div>

        {/* Lista de enlaces */}
        <ul className="flex-grow md:text-2xl text-xl flex flex-col">
          <li className="p-4">
            <Link to="/" onClick={Cerrado}>
              Inicio
            </Link>
          </li>
          <li className="p-4">
            <Link to="/nevera" onClick={Cerrado}>
              Mi Nevera
            </Link>
          </li>
          <li className="p-4">
            <Link to="/recetas_generadas" onClick={Cerrado}>
              Recetas
            </Link>
          </li>
          <li className="p-4">
            <button
              onClick={toggleModal}  // Abre el modal
              className="w-full text-left"  // Esto es solo para que se vea como un enlace
            >
              Perfil
            </button>
          </li>

          <li className="p-4 cursor-pointer" onClick={handleLogout}>
            Cerrar Sesión
          </li>
        </ul>

        {/* Espacio inferior */}
        <div className="bg-peach h-20 sm:h-20 md:h-21 lg:h-24"></div>
      </nav>
      {/* Modal usuario */}
      {usuario && (
        <Modal
          isOpen={modalAbierto}
          onClose={toggleModal}
          usuario={usuario}
          editarNombre={editarNombre}
          editarContraseña={editarContraseña}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
};

export default Menu_lateral;
