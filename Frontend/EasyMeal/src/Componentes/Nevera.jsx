import React, { useEffect, useState } from "react";
import ServicioIngrediente from "../ServicioLogin/ServicioIngrediente";
import Swal from 'sweetalert2';

// Componente Ingredientes
const Ingredientes = () => {
  const [ingredientes, setIngredientes] = useState([])
  //para coger todos los ingredientes
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

  return (
    <>
      <div className="flex flex-col p-10">
        <h1 className="font-bold text-xl md:text-3xl mb-4">Mi nevera</h1>
        <h2 className="text-xl md:text-2xl mb-4">¿Qué ingredientes quieres que tenga la receta?</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {ingredientes.map((ingrediente, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              minWidth: "100px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {ingrediente}
          </div>
        ))}
      </div>
    </>


  );
};

export default Ingredientes;
