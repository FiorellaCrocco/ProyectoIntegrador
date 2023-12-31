import { useState, useContext, useRef } from "react";
import "./AgregarCategoria.css";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function AgregarCategoria() {
  const token = sessionStorage.getItem("token");
  const URL_API = import.meta.env.VITE_API_URL;

  const { actualizarCategorias } = useContext(GlobalContext);
  const formRef = useRef(null);

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
    const file = e.target.files[0]; // Utiliza e.target.files[0] en lugar de e.target.file
    const base64Data = await readFileAsBase64(file);
    setCategoria(() => {
      return {
        ...categoria, // Asegúrate de mantener el resto de las propiedades
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
    const url = `${URL_API}categoria/agregar`;
    //  const url = "https://onlybooks.isanerd.club/api/categoria/agregar";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoria),
    };

    try {
      const res = await fetch(url, config);

      if (res.status === 200) {
        await actualizarCategorias();
        formRef.current.reset();

        setCategoria({
          titulo: "",
          descripcion: "",
        });
        // Mostrar mensaje de éxito
        Swal.fire({
          text: "Categoría creada con éxito",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Error al crear categoría",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return (
    <div>
      <h2 className="tituloNewCat">Crear Categoría</h2>
      <div className="agregar-categoria">
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="agregar-categoria-div">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={categoria.titulo}
              onChange={handleChange}
            />
          </div>
          <div className="agregar-categoria-div">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={categoria.descripcion}
              onChange={handleChange}
            />
          </div>
          <div className="agregar-categoria-div">
            <label>Imagen:</label>
            <input
              className="input"
              type="file"
              name="imagen"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="FormBtn">Guardar Categoría</button>
        </form>
      </div>
    </div>
  );
}
export default AgregarCategoria;
