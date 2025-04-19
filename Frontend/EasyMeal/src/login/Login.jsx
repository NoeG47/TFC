import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";
import bcrypt from "bcryptjs";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

      const hashGuardado = usuario.contraseña;
      const esCorrecta = bcrypt.compareSync(password, hashGuardado);

      if (!esCorrecta) {
        setError("Contraseña incorrecta");
        return;
      }

      // Éxito: redirigir
      Swal.fire("Sesión iniciada", "", "success");
      login(usuario);
      navigate('/ingredientes');
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6 sm:px-12 md:px-20 py-8">
      <div className="bg-white border border-black rounded-2xl py-10 px-6 sm:px-12 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl sm:text-4xl font-semibold text-center">Bienvenid@ a EasyMeal</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              value={correo}
              placeholder="Correo electrónico"
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full text-base sm:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-base sm:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>
          {error && (
            <p className="text-base sm:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-40 sm:w-50 mx-auto block text-base sm:text-xl bg-sage text-white font-semibold py-2 rounded-xl"
          >
            Acceder
          </button>
          <Link
            to="/registrar"
            className="w-40 sm:w-50 mx-auto block text-base sm:text-xl bg-sage text-white text-center font-semibold py-2 rounded-xl"
          >
            Registrarse
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
