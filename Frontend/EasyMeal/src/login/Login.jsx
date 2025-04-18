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
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white border border-black rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-semibold text-center">Bienvenid@ a EasyMeal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={correo}
              placeholder='Correo electrónico'
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder='Contraseña'
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage placeholder:text-center"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 bg-red-100 px-3 py-2 rounded">{error}</p>
          )}
          <button
            type="submit"
            className="w-full block bg-sage text-white text-center font-semibold py-2 rounded-md hover:bg-mint transition duration-300"
          >
            Acceder
          </button>
          <Link
            to="/registrar"
            className="w-full block bg-sage text-white text-center font-semibold py-2 rounded-md hover:bg-mint transition duration-300"
          >
            Registrarse
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
