import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";
import bcrypt from "bcryptjs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Función para guardar usuario en el contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usuario = await ServicioUsuario.buscarUsuarioPorCorreo(correo);

      if (!usuario) {
        setError("Correo no encontrado");
        return;
      }

      const hashGuardado = usuario.contrasena;
      const esCorrecta = bcrypt.compareSync(password, hashGuardado);

      if (!esCorrecta) {
        setError("Contraseña incorrecta");
        return;
      }

      // Éxito: redirigir
      Swal.fire("Sesión iniciada", "", "success");
      login(usuario);
      navigate("/nevera");
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-white px-6 sm:px-12 md:px-20 py-8 overflow-x-hidden">
      {/* Capa de alimentos flotantes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-x-hidden">
        {/* Escritorio y tablet */}
        <img
          src="/images/index/queso.png"
          alt="queso"
          className="hidden sm:block absolute top-52 left-1/4 w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/aguacate.png"
          alt="palta"
          className="hidden sm:block absolute top-44 right-1/4 w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/zanahoria.png"
          alt="zanahoria"
          className="hidden sm:block absolute bottom-36 right-1/4 w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/naranja.png"
          alt="naranja"
          className="hidden sm:block absolute bottom-36 right-1/3 w-8 md:w-10 lg:w-12"
        />
        <img
          src="/images/index/manzana.png"
          alt="manzana"
          className="hidden sm:block absolute bottom-28 left-[20%] w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/carne.png"
          alt="carne"
          className="hidden sm:block absolute top-[70%] left-[28%] w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/pollo.png"
          alt="pollo"
          className="hidden sm:block absolute top-1/2 left-[20%] w-10 md:w-14 lg:w-16"
        />
        <img
          src="/images/index/brocoli.png"
          alt="brócoli"
          className="hidden sm:block absolute top-1/2 right-[20%] w-12 md:w-16 lg:w-20"
        />

        {/* Móvil: 1 imagen por esquina con 50% más de desplazamiento */}
        <img
          src="/images/index/queso.png"
          alt="queso"
          className="block sm:hidden absolute top-[7rem] left-2 w-12"
        />
        <img
          src="/images/index/aguacate.png"
          alt="aguacate"
          className="block sm:hidden absolute top-[7rem] right-2 w-12"
        />
        <img
          src="/images/index/manzana.png"
          alt="manzana"
          className="block sm:hidden absolute bottom-[7rem] left-2 w-12"
        />
        <img
          src="/images/index/zanahoria.png"
          alt="zanahoria"
          className="block sm:hidden absolute bottom-[6rem] right-2 w-12"
        />
      </div>

      <div className="relative z-10 bg-white border border-black rounded-2xl px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 w-full max-w-2xl space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
          Bienvenid@ a <span className="text-sage">EasyMeal</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              value={correo}
              placeholder="Correo electrónico"
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>

          {error && (
            <p className="text-base sm:text-lg md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4 gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-40 text-base sm:text-lg bg-sage text-white font-semibold py-2 rounded-xl hover:bg-mint hover:scale-105 transform transition duration-300 cursor-pointer"
            >
              Acceder
            </button>
            <Link
              to="/registrar"
              className="w-full sm:w-40 text-base sm:text-lg bg-sage text-white text-center font-semibold py-2 rounded-xl hover:bg-mint hover:scale-105 transform transition duration-300"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
