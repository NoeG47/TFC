import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";  // Importa el servicio de usuario

const Registrar = () => {
  const [errores, setErrores] = useState({});
  const [form, setForm] = useState({
    nombre: '',
    contrasena: '',
    correo: '',
    imagen_perfil: '', // Imagen de perfil
    receta: null, // Receta vacía
    fechaCreacion: new Date().toISOString(), // Fecha de creación
  });
  const navigate = useNavigate();


  const gestionarCambio = (e) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!form.correo.trim()) nuevosErrores.correo = 'El correo es obligatorio';
    if (!form.contrasena.trim()) nuevosErrores.contrasena = 'La contrasena es obligatoria';
    else if (form.contrasena.length < 6) nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    
    return nuevosErrores;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // Cifrado de la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(form.contrasena, salt);

      const usuarioNuevo = {
        nombre: form.nombre,
        contrasena: hashedPassword,
        correo: form.correo,
        imagen_perfil: form.imagen_perfil,
        receta: null,
        fechaCreacion: form.fechaCreacion,
      };

      // Enviamos la solicitud para registrar al nuevo usuario
      ServicioUsuario.registrarUsuario(usuarioNuevo)
        .then(() => {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Tu usuario ha sido registrado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");  // redirige al login
          });
        })
        .catch((error) => {
          console.error("Error de registro:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al registrar el usuario.",
            icon: "error",
            confirmButtonText: "Intentar de nuevo",
          });
        });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6 sm:px-12 md:px-20 py-8">
      <div className="bg-white border border-black rounded-2xl py-10 px-6 sm:px-12 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl md:text-4xl font-semibold text-center">Crea tu cuenta en EasyMeal</h2>
        <form onSubmit={enviarFormulario} className="space-y-5">
          <div>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={gestionarCambio}
              placeholder="Nombre de usuario"
              className="w-full text-base md:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 placeholder:text-center"
            />
            {errores.nombre && (
              <p className="text-base md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
                {errores.nombre}
              </p>
            )}
          </div>
  
          <div>
            <input
              id="correo"
              type="text"
              name="correo"
              value={form.correo}
              onChange={gestionarCambio}
              placeholder="Correo Electrónico"
              className="w-full text-base md:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 placeholder:text-center"
            />
            {errores.correo && (
              <p className="text-base md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
                {errores.correo}
              </p>
            )}
          </div>
  
          <div>
            <input
              id="contrasena"
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={gestionarCambio}
              placeholder="Contraseña"
              className="w-full text-base md:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 placeholder:text-center"
            />
            {errores.contrasena && (
              <p className="text-base md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
                {errores.contrasena}
              </p>
            )}
          </div>
  
          <div>
            <input
              id="imagen_perfil"
              type="text"
              name="imagen_perfil"
              value={form.imagen_perfil}
              onChange={gestionarCambio}
              placeholder="URL de la imagen de perfil"
              className="w-full text-base sm:text-xl border border-gray-300 rounded-xl px-2 sm:px-4 py-2 sm:py-3 placeholder:text-center"
            />
          </div>
  
          <button
            type="submit"
            className="w-40 sm:w-50 mx-auto block text-base sm:text-xl bg-sage text-white font-semibold py-2 rounded-xl"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );  
};

export default Registrar;
