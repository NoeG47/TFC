import React from "react";
import { useAuth } from "../login/AuthProvider";
import { useNavigate } from "react-router-dom";

const Menu_lateral = ({ Abierto, Cerrado }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Cerrado();
    navigate("/");
  };
  if (!Abierto)
    return null;
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
          className="font-bold text-right bg-peach h-24 sm:h-20 md:h-24 lg:h-28 flex items-center justify-end pr-6"
          onClick={Cerrado}
        >
          <button className="text-4xl cursor-pointer">×</button>
        </div>

        {/* Lista de enlaces */}
        <ul className="flex-grow md:text-2xl text-xl flex flex-col">
          <li className="p-4">
            <a href="/">Inicio</a>
          </li>
          <li className="p-4">
            <a href="/">Mi nevera</a>
          </li>
          <li className="p-4">
            <a href="#">Recetas</a>
          </li>
          <li className="p-4">
            <a href="/">Perfil</a>
          </li>
          <li className="p-4">
            <a href="#" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          </li>
        </ul>

        {/* Espacio inferior */}
        <div className="bg-peach h-20 sm:h-20 md:h-21 lg:h-24"></div>
      </nav>
    </>
  );
};

export default Menu_lateral;
