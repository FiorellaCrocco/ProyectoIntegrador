import React, { useState } from 'react';
import "./CargarProducto.css"

function ImageUploadForm() {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({
      ...formData,
      image: selectedImage,
    });
  };

  const [libros, setLibros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nombre:', formData.name);
    console.log('Detalle:', formData.detail);
    console.log('Imagen seleccionada:', formData.image ? formData.image.name : 'Ninguna imagen seleccionada');
    
    // Crear un nuevo objeto con los datos del formulario
  const nuevoLibro = {
    name: formData.name,
    detail: formData.detail,
    image: formData.image,
  };

  // Agregar el nuevo libro al array de libros
  setLibros([...libros, nuevoLibro]);

  // Limpiar los campos del formulario
  setFormData({
    name: '',
    detail: '',
    image: null,
  });
  };

  return (
    <div className="Container">
      <h1 className='titulo'>Cargar Libro</h1>
      <form  className='formulario' onSubmit={handleSubmit}>
        <div className='div'>
          <label className='labels' htmlFor="name">Titulo:</label>
          <input className='input'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='div'>
          <label className='labels' htmlFor="detail">Detalle:</label>
          <input className='detail'
            type="text"
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
          />
        </div>
        <div className='div'>
          <label className='labels' htmlFor="image">Imagen:</label>
          <input className='input'
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button className = "FormBtn" type="submit">Guardar Libro</button>
      </form>

      

    
  
    </div>

    
  );
}

export default ImageUploadForm;



