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

export default {
  obtenerIngredientes,
};
