import { useContext, useState } from "react";
import "./CargarProducto.css";
import { GlobalContext } from "../../Context/globalContext";

function ImageUploadForm() {
  const { actualizarListaLibros} = useContext(GlobalContext)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [],
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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData((prevData) => {
      return {
        ...prevData,
        image: [...prevData.image, selectedImage],
      };
    });
  };

  //const [libros, setLibros] = useState([]);
  //const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const url="http://localhost:8080/book/agregar"
    const settings ={
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formData)
    }
    
    fetch(url,settings)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error=>{
        console.log(error)
      })
      await actualizarListaLibros();

    // Limpiar los campos del formulario
    setFormData({
      title: "",
      description: "",
      image: [],
    });
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
