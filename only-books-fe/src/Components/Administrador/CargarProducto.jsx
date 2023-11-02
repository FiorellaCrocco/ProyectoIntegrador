import { useContext, useState } from "react";
import "./CargarProducto.css";
import { GlobalContext } from "../../Context/globalContext";

function ImageUploadForm() {
  const { actualizarListaLibros} = useContext(GlobalContext)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    s: [],
  });

  const handleInputChange = (e) => {
    setFormData({
        ...formData,
        title: e.target.value,
    });
  };

  const handleDetailChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      description: value,
    });
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    })
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64Data = await readFileAsBase64(file);
      base64Array.push(base64Data);
    }
    
    console.log(base64Array);

    setFormData((prevData) => {
      return {
        ...prevData,
        images: base64Array,
      };
    });
  };


  //const [libros, setLibros] = useState([]);
  //const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url="http://localhost:8080/book/agregar"
   // const url = "https://onlybooks.isanerd.club/api/book/agregar";
    const settings ={
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    }
    
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      console.log(data);

      // Limpiar los campos del formulario
      setFormData({
        title: "",
        description: "",
        images: [],
      });

      // Actualizar la lista de libros después de la carga exitosa
      await actualizarListaLibros();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <h1 className="titulo">Cargar Libro</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="div">
          <label className="labels" htmlFor="name">
            Titulo:
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="div">
          <label className="labels" htmlFor="detail">
            Detalle:
          </label>
          <input
            className="detail"
            type="text"
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleDetailChange}
          />
        </div>
        <div className="div">
          <label className="labels" htmlFor="image">
            Imagen:
          </label>
          <input
            className="input"
            type="file"
            multiple
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button className="FormBtn" type="submit">
          Guardar Libro
        </button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
