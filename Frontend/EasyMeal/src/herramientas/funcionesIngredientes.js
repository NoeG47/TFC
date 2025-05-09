import Swal from "sweetalert2";

// Capitaliza el texto
export const capitalizar = (texto) =>
  texto
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");

// Cambia de página (anterior)
export const manejarPaginaAnterior = (paginaActual, setPaginaActual) => {
  if (paginaActual > 1) setPaginaActual(paginaActual - 1);
};

// Cambia de página (siguiente)
export const manejarPaginaSiguiente = (paginaActual, totalPaginas, setPaginaActual ) => {
  if (paginaActual < totalPaginas) {
    setPaginaActual(paginaActual + 1);
  }
};

// Maneja la búsqueda y muestra alerta si no encuentra
export const manejarClickBusqueda = (busquedaInput, setBusqueda, setPaginaActual, ingredientes) => {
  setBusqueda(busquedaInput);
  setPaginaActual(1);

  const resultados = ingredientes.filter((ingrediente) =>
    ingrediente.nombre.includes(busquedaInput)
  );

  if (busquedaInput.trim() !== "" && resultados.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Ingrediente no encontrado",
      text: `No se encontraron ingredientes que coincidan con "${busquedaInput}".`,
    });
  }
};

export const SeleccionIngredientes = (id, seleccionados, setSeleccionados) => {
  const yaSeleccionadoVerde = seleccionados.includes(id); 

  if (yaSeleccionadoVerde) { 
    setSeleccionados(seleccionados.filter((i) => i !== id)); //para que se quite si se vuelve a pulsar
  } else {
    setSeleccionados([...seleccionados, id]);//se mantenga como seleccionado
  }
};
