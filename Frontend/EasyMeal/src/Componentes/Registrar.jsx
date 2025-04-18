import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";  // Importa el servicio de usuario

const Registrar = () => {
  const [errores, setErrores] = useState({});
  const [form, setForm] = useState({
    nombre: '',
    contraseña: '',
    correo: '',
    imagen_perfil: null, // Imagen de perfil
    receta: null, // Receta vacía
    fechaCreacion: new Date().toISOString(), // Fecha de creación
  });

  const gestionarCambio = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setForm({
        ...form,
        [name]: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!form.correo.trim()) nuevosErrores.correo = 'El correo es obligatorio';
    if (!form.contraseña.trim()) nuevosErrores.contraseña = 'La contraseña es obligatoria';
    else if (form.contraseña.length < 6) nuevosErrores.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    
    return nuevosErrores;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      // Cifrado de la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(form.contraseña, salt);

      const usuarioNuevo = {
        nombre: form.nombre,
        contraseña: hashedPassword,
        correo: form.correo,
        imagen_perfil: form.imagen_perfil? form.imagen_perfil.name : "",
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
    <div>
      <h2>Crea tu cuenta en EasyMeal</h2>
      <form onSubmit={enviarFormulario}>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={gestionarCambio}
          placeholder="Nombre de usuario"
        />
        {errores.nombre && <p className="error-message">{errores.nombre}</p>}

        <input
          id="correo"
          type="text"
          name="correo"
          value={form.correo}
          onChange={gestionarCambio}
          placeholder="Correo Electrónico"
        />
        {errores.correo && <p className="error-message">{errores.correo}</p>}

        <input
          id="contraseña"
          type="password"
          name="contraseña"
          value={form.contraseña}
          onChange={gestionarCambio}
          placeholder="Contraseña"
        />
        {errores.contraseña && <p className="error-message">{errores.contraseña}</p>}

        <input
          id="imagen_perfil"
          type="file"
          name="imagen_perfil"
          onChange={gestionarCambio}
          accept="image/*"
        />
        <button className="submit-button" type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};

export default Registrar;
