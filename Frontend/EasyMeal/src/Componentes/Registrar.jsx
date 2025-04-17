import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";


const Registrar = ({ }) => {
    const [errores, setErrores] = useState({});

    // Amacenar los valores del formulario(En todo momento!!!) 
    const [form, setForm] = useState({
        nombre: '',
        pass: '',
        correo: '',
    });
    const gestionarCambio = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };
    const validar = () => {
        const nuevosErrores = {};

        // Validación para "nombre"
        if (!form.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es obligatorio';
        }
        if (!form.pass.trim()) {
            nuevosErrores.pass = 'La contraseña es obligatorio';
        }
        if (!form.correo.trim()) {
            nuevosErrores.correo = 'El correo es obligatorio';
        }
        // Retorna true si no hay errores, de lo contrario retorna false
        return Object.keys(nuevosErrores).length === 0;
    };
    const enviarFormulario = (e) => {
        e.preventDefault();
        if (validar()) {
            //hasehar la contraseña para asi guardarla en el json
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(form.pass, salt);
            const usuarioNuevo = {
                nombre: form.nombre,
                pass: hashedPassword,
                correo: form.correo,
            };
            ServicioUsuario.registrarUsuario(usuarioNuevo)
                .then((response) => {
                    Swal.fire({
                        title: "¡Registro exitoso!",
                        text: "Tu usuario ha sido registrado correctamente.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al registrar el usuario.",
                        icon: "error",
                        confirmButtonText: "Intentar de nuevo"
                    });
                });
        }
    };


    return (
        <div >
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
                    placeholder="Correo Electronico"
                />
                {errores.correo && <p className="error-message">{errores.correo}</p>}

                <input
                    id="pass"
                    type="password"
                    name="pass"
                    value={form.pass}
                    onChange={gestionarCambio}
                    placeholder="Contraseña"
                />
                {errores.pass && <p className="error-message">{errores.pass}</p>}
                <button className="submit-button" type="submit">Crear Cuenta</button>
            </form>
        </div>
    );
}
export default Registrar;