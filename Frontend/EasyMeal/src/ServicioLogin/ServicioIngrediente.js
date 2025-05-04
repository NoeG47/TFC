import http from "../ServicioAxiosStorage/http-axios";

const obtenerIngredientes = async () => {
  try {
    const response = await http.get("/ingredientes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los ingredientes:", error);
    throw error;
  }
};

const agregarIngrediente = async (nombre) => {
  try {
    const response = await http.post("/ingredientes", { nombre });
    return response.data;
  } catch (error) {
    console.error("Error al agregar el ingrediente:", error);
    throw error;
  }
};

const actualizarIngrediente = async (id, nombre) => {
  try {
    const response = await http.put(`/ingredientes/${id}`, { nombre });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el ingrediente:", error);
    throw error;
  }
};

const eliminarIngrediente = async (id) => {
  try {
    const response = await http.delete(`/ingredientes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error);
    throw error;
  }
};

export default {
  obtenerIngredientes,
  agregarIngrediente,
  actualizarIngrediente,
  eliminarIngrediente,
};
