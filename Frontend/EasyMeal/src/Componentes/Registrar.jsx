import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServicioUsuario from "../ServicioLogin/ServicioUsuario";

const Registrar = () => {
  const [errores, setErrores] = useState({});
  const [form, setForm] = useState({
    nombre: "",
    contrasena: "",
    correo: "",
    imagen_perfil: "",
    receta: null,
    fechaCreacion: new Date().toISOString(),
  });
  const navigate = useNavigate();

  const gestionarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.correo.trim()) nuevosErrores.correo = "El correo es obligatorio";
    if (!form.contrasena.trim()) {
      nuevosErrores.contrasena = "La contraseña es obligatoria";
    } else if (form.contrasena.length < 6) {
      nuevosErrores.contrasena =
        "La contraseña debe tener al menos 6 caracteres";
    }
    return nuevosErrores;
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      const hashedPassword = bcrypt.hashSync(form.contrasena, 10);

      const usuarioNuevo = {
        nombre: form.nombre,
        contrasena: hashedPassword,
        correo: form.correo,
        imagen_perfil: form.imagen_perfil,
        receta: null,
        fechaCreacion: form.fechaCreacion,
      };

      ServicioUsuario.registrarUsuario(usuarioNuevo)
        .then(() => {
          Swal.fire({
            title: "¡Registro exitoso!",
            text: "Tu usuario ha sido registrado correctamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");
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

        {/* Móvil: 1 imagen por esquina con desplazamiento adicional */}
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

      {/* Formulario */}
      <div className="relative z-10 bg-white border border-black rounded-2xl px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 w-full max-w-2xl space-y-6 shadow-xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
          Crea tu cuenta en <span className="text-sage">EasyMeal</span>
        </h2>
        <form onSubmit={enviarFormulario} className="space-y-5">
          <div>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={gestionarCambio}
              placeholder="Nombre de usuario"
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 placeholder:text-center"
            />
            {errores.nombre && (
              <p className="text-base sm:text-lg md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
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
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 placeholder:text-center"
            />
            {errores.correo && (
              <p className="text-base sm:text-lg md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
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
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 placeholder:text-center"
            />
            {errores.contrasena && (
              <p className="text-base sm:text-lg md:text-xl text-red-500 bg-red-100 px-3 py-2 rounded text-center">
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
              className="w-full text-base sm:text-lg md:text-xl border border-gray-300 rounded-xl px-4 py-3 placeholder:text-center"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-40 mx-auto block text-base sm:text-lg md:text-xl bg-sage text-white font-semibold py-2 rounded-xl hover:bg-mint hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
