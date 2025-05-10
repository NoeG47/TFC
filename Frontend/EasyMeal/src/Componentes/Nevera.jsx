import React, { useEffect, useState } from "react";
import ServicioIngrediente from "../ServicioLogin/ServicioIngrediente";
import Swal from "sweetalert2";
import { FaSearch, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { capitalizar, manejarPaginaAnterior, manejarPaginaSiguiente, manejarClickBusqueda, SeleccionIngredientes, } from "../herramientas/funcionesIngredientes"

const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([]);
  const [busqueda, setBusqueda] = useState(""); //al hacer click al botón
  const [busquedaInput, setBusquedaInput] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const ingredientesPorPagina = 8;

  useEffect(() => {
    const cargarIngredientes = async () => {
      try {
        const data = await ServicioIngrediente.obtenerIngredientes();
        setIngredientes(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los ingredientes.",
        });
      }
    };
    cargarIngredientes();
  }, []);
  const ingredientesFiltrados = ingredientes.filter((ingrediente) =>
    ingrediente.nombre.includes(busqueda) //que muestre la lista
  );

  const indiceUltimoIngrediente = paginaActual * ingredientesPorPagina;
  const indicePrimerIngrediente = indiceUltimoIngrediente - ingredientesPorPagina;
  const ingredientesActuales = ingredientesFiltrados.slice(
    indicePrimerIngrediente,
    indiceUltimoIngrediente
  );
  {/*debe ser entero para que no se pierdan los ingredientes en un futuro*/ }
  const totalPaginas = Math.ceil(ingredientesFiltrados.length / ingredientesPorPagina);

  const ingredientesSeleccionadosDetalles = ingredientes.filter((ing) =>
    ingredientesSeleccionados.includes(ing.id) //ingredientes YA elegidos
  );
  const limpiarBusqueda = () => {
    setBusquedaInput("");
    setBusqueda("");  // Limpia la búsqueda filtrada
  };
  return (
    <div className="flex flex-col p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start p-4 sm:p-6 md:p-10 gap-4 md:gap-6">
        <div>
          <h1 className="font-bold text-xl md:text-3xl my-2">Mi nevera</h1>
          <h2 className="text-xl md:text-2xl my-4">
            ¿Qué ingredientes quieres que tenga la receta?
          </h2>
        </div>

        {/* ingredientes seleccionados */}
        <div className="border rounded-lg bg-white shadow p-4 w-full">
          {ingredientesSeleccionadosDetalles.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredientes seleccionados:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {ingredientesSeleccionadosDetalles.map((ing) => (
                  <li key={ing.id}>{capitalizar(ing.nombre)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 italic">Sin ingredientes seleccionados</p>
          )}
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex items-center gap-2 mb-10 pl-10">
        <input
          type="text"
          placeholder="Buscar"
          value={busquedaInput}
          onChange={(e) => setBusquedaInput(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2  w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() =>
            manejarClickBusqueda(busquedaInput, setBusqueda, setPaginaActual, ingredientes)
          }
          className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <FaSearch />{/*icono de la lupa*/}
        </button>
        {busquedaInput && (
          <button
            onClick={limpiarBusqueda}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <FaTimes />{/*icono de la x*/}
          </button>
        )}
      </div>

      {/* Lista de ingredientes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-3">
        {ingredientesActuales.map((ingrediente) => {
          const seleccionado = ingredientesSeleccionados.includes(ingrediente.id);
          return (
            <div
              key={ingrediente.id}
              onClick={() =>
                SeleccionIngredientes(ingrediente.id, ingredientesSeleccionados, setIngredientesSeleccionados)
              }
              className={`border  border-gray-300 rounded-lg p-3 min-w-[100px] text-center shadow-md cursor-pointer hover:scale-105 transform transition duration-300 ${seleccionado ? "bg-mint" : "border-gray-300"}`}
            >
              {capitalizar(ingrediente.nombre)}
            </div>
          );
        })}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4 m-5 p-5">
        <button
          onClick={() => manejarPaginaAnterior(paginaActual, setPaginaActual)}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:scale-125 transform transition duration-200"
          title="Página anterior"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <p className="text-base md:text-lg">
          Página {paginaActual} de {totalPaginas}
        </p>
        <button
          onClick={() => manejarPaginaSiguiente(paginaActual, totalPaginas, setPaginaActual)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 hover:scale-125 transform transition duration-200"
          title="Página siguiente"
        >
          <FaArrowRight className="text-white" />
        </button>
      </div>
      <div className="flex flex-col items-center p-5">
        <button className="bg-burnt-orange w-fit text-white px-6 py-2 rounded-md mb-4 hover:bg-mint hover:scale-105 transform transition duration-300 text-center text-2xl">
          Crear recetas
        </button>
      </div>
    </div>
  );
};

export default Ingredientes;
