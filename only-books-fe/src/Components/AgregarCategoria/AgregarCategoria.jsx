import { useState, useContext } from "react";
import "./AgregarCategoria.css";
import { GlobalContext } from "../../Context/globalContext";

function AgregarCategoria() {

  const token = sessionStorage.getItem('token')

  const { actualizarCategorias } = useContext(GlobalContext);

  const [categoria, setCategoria] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];  // Utiliza e.target.files[0] en lugar de e.target.file
    const base64Data = await readFileAsBase64(file);
    setCategoria(() => {
      return {
        ...categoria,  // Asegúrate de mantener el resto de las propiedades
        imagen: base64Data,
      };
    });
  };
  
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        // Obtener la cadena Base64 sin el prefijo
        const base64WithoutPrefix = reader.result.split(",")[1];
        resolve(base64WithoutPrefix);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };
  

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:8080/categoria/agregar";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(categoria),
    };
  
    try {
      const res = await fetch(url, config);
  
      if (res.status === 200) {
        await actualizarCategorias();
        console.log("Categoría creada con éxito");
      } else {
        console.log("Error al crear categoría");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
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
            className="input"
            type="file"
            name="imagen"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Guardar Categoría</button>
      </form>
    </div>
  );
}
export default AgregarCategoria;
