import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
//import ServicioUsuario from "../ServicioLogin/ServicioUsuario"
import bcrypt from "bcryptjs"; //LO HE AÑADIDO PARA QEU SE PUDIERA VER LA PAG XD

//import bcrypt from "bcryptjs/dist/bcrypt"; HE COMENTADO ESTO PORQUE NO SÉ QUÉ ES XD
//import "../estilos/login.css";
import { Link } from 'react-router-dom';


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    sesion: false,
    notificacion: false,
  });
  const [error, setError] = useState('');
  //const { login, loginNoLogeada } = useAuth(); //DESCOMENTAR LUEGO CUANDO TENGA LA FUNCIONALIDAD, NO SE VEÍA LA PAG
  const navigate = useNavigate();
  //para el cheked
  const gestionarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  //función para cifrar
  const cifrarPassword = (con) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(con, salt);
    console.log(`salt ${salt}`);
    console.log(`hash ${hash}`);
    return hash;
  }
  const handleSubmit = async (e) => {

    e.preventDefault();

    ServicioUsuario.login(usuario, password)
      .then((response) => {
        if (response.data.length !== 0) {
          const usuario = response.data[0].nombre;
          const hashUsuario = response.data[0].pass;
          const esCorrecta = bcrypt.compareSync(password, hashUsuario);
          if (esCorrecta) {
            if (form.sesion === true) {
              Swal.fire("Session Realizada", "success");
              login(usuario);
            }
            if (form.sesion === false) {
              Swal.fire("Session No se guardara", "success");
              loginNoLogeada(usuario);
            }

            //te lleva al inicio
            navigate('/');
          } else {
            setError("contraseña incoreecta");
          }

        } else {

          setError("Usuario no es correcto")
        }


      })
      .catch((error) => {
        alert(error)
        navigate('/login');
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-white border border-black rounded-2xl p-8 w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold text-center">Bienvenid@ a EasyMeal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={usuario}
                placeholder='Correo electrónico'
                onChange={(e) => setUsuario(e.target.value)}
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
            <Link
              to="/ingredientes"
              className="w-full block bg-sage text-white text-center font-semibold py-2 rounded-md hover:bg-mint transition duration-300"
            >
              Acceder
            </Link>
            <Link
              to="/registrar"
              className="w-full block bg-sage text-white text-center font-semibold py-2 rounded-md hover:bg-mint transition duration-300"
            >
              Registrarse
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
