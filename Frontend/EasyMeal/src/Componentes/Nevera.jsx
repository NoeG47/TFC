import React, { useEffect, useState } from "react";
import ServicioIngrediente from "../ServicioLogin/ServicioIngrediente";
import Swal from 'sweetalert2';
import { FaSearch } from "react-icons/fa";
// Componente Ingredientes
const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1); //empieza por la 1
  const ingredientesPorPagina = 8;//mostrar 8 por página
  //para coger todos los ingredientes solo una vez
  useEffect(() => {
    const cargarIngredientes = async () => {
      try {
        const data = await ServicioIngrediente.obtenerIngredientes();
        setIngredientes(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los ingredientes.',
        });
      }
    }
    cargarIngredientes();
  }, [])
  //no sé si es mejor añadir esto a un js
  const indiceUltimoIngrediente = paginaActual * ingredientesPorPagina;
  const indicePrimerIngrediente = indiceUltimoIngrediente - ingredientesPorPagina;
  const ingredientesActuales = ingredientes.slice(indicePrimerIngrediente, indiceUltimoIngrediente);

  const totalPaginas = Math.ceil(ingredientes.length / ingredientesPorPagina);

  const manejarPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const manejarPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <>
      <div className="flex flex-col p-10 ">
        <h1 className="font-bold text-xl md:text-3xl my-2">Mi nevera</h1>
        <h2 className="text-xl md:text-2xl my-8">¿Qué ingredientes quieres que tenga la receta?</h2>

        {/*AÑADIR LA FUNCIONALIDAD PARA LA BARRA DE BÚSQUEDA*/}
         <div className="flex items-center gap-2 mb-8">
          <input
            type="text"
            placeholder="Buscar"
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg flex items-center justify-center cursor-pointer"
          >
            <FaSearch />
          </button>
        </div>
        {/*cuatro por fila en grande y dos por fila en móvil*/}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
          {ingredientesActuales.map((ingrediente, indice) => (
            <div
              key={indice}
              className="border border-gray-300 rounded-lg p-3 min-w-[100px] text-center bg-gray-100 shadow-md cursor-pointer hover:scale-105 transform transition duration-300"
            >
              {ingrediente}
            </div>
          ))}
        </div>

        {/* para paginar */}
        <div className="flex justify-center items-center gap-4 m-5 p-5">
          <button
            onClick={manejarPaginaAnterior}
            disabled={paginaActual === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:scale-105 transform transition duration-300"
          >
            -
          </button>
          <p className=" text-base md:text-lg">
            Página {paginaActual} de {totalPaginas}
          </p>
          <button
            onClick={manejarPaginaSiguiente}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:scale-105 transform transition duration-300"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-center p-5">
          {/*crear las recetas*/}
          <button className="bg-burnt-orange w-fit text-white px-6 py-2 rounded-md mb-4 hover:bg-mint hover:scale-105 transform transition duration-300 text-center text-2xl">Crear recetas</button>
        </div>

      </div>

    </>
  );
};

export default Ingredientes;
