// src/ServicioLogin/ServicioUsuario.js
import http from "../ServicioAxiosStorage/http-axios";

// 🔐 REGISTRO
const registrarUsuario = async (usuarioNuevo) => {
  try {
    // Aseguramos que enviamos el objeto con los nombres de campo correctos
    const usuarioParaEnviar = {
      nombre: usuarioNuevo.nombre,
      correo: usuarioNuevo.correo,
      contraseña: usuarioNuevo.contraseña, // muy importante: "contraseña", no "pass"
      imagen_perfil: usuarioNuevo.imagen_perfil || "", // puedes usar null también
      fechaCreacion: usuarioNuevo.fechaCreacion || new Date().toISOString(), // por si acaso
    };

    const response = await http.post("/usuarios", usuarioParaEnviar);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

const buscarUsuarioPorCorreo = async (correo) => {
  try {
    const response = await http.get("/usuarios"); // obtiene todos
    const usuario = response.data.find((u) => u.correo === correo);
    return usuario;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw error;
  }
};
// Actualizar nombre de usuario
const actualizarNombre = async (id, nuevoNombre) => {
  try {
    const response = await http.put(`/usuarios/${id}/nombre`, { nombre: nuevoNombre });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el nombre:", error);
    throw error;
  }
};

// Actualizar contraseña de usuario
const actualizarContraseña = async (id, nuevaContraseña) => {
  try {
    const response = await http.put(`/usuarios/${id}/contraseña`, { contraseña: nuevaContraseña });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};

export default {
  registrarUsuario,
  buscarUsuarioPorCorreo,
  actualizarNombre,
  actualizarContraseña,
};
