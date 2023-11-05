import { useState } from "react";
import "./AgregarCategoria.css";

function AgregarCategoria() {
  const [categoria, setCategoria] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:8080/categoria/agregar";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoria),
    };
    fetch(url, config)
      .then((res) => {
        if (res.status == 200) {
          console.log("Categoria creada con exito");
        } else {
          console.log("Error al crear categoria");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
      });
  }

  return (
    <div className="agregar-categoria">
      <h2>Crear Nueva Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={categoria.titulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="descripcion"
            value={categoria.descripcion}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            name="imagen"
            value={categoria.imagen}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar Categoría</button>
      </form>
    </div>
  );
}
export default AgregarCategoria;
