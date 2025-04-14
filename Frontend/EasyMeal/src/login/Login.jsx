import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import ServicioUsuario from "../ServicioLogin/ServicioUsuario"
import bcrypt from "bcryptjs/dist/bcrypt";
import Swal from 'sweetalert2';
import "../estilos/login.css";


const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState({
    sesion: false,
    notificacion: false,
  });
  const [error, setError] = useState('');
  const { login, loginNoLogeada } = useAuth();
  const navigate = useNavigate();
  //para el cheked
  const gestionarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  //funcioj para cifrar
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
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
    <label className="label">Usuario</label>
    <input
      type="text"
      value={usuario}
      onChange={(e) => setUsuario(e.target.value)}
      required
      className="input-field"
    />
  </div>
  <div className="input-group">
    <label className="label">Password:</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="input-field"
    />
  </div>
  <div className="checkbox-group">
    <input
      type="checkbox"
      name="sesion"
      checked={form.sesion}
      onChange={gestionarCambio}
      className="checkbox"
    />
    <label htmlFor="sesion" className="label">Recordar Sesión</label>
  </div>
  {error && <p className="error-message">{error}</p>}
  
  <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>

  );
};

export default Login;
