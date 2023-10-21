import React, { useState } from 'react';
import "./Administrador.css"

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario, como enviarlos a un servidor.
    console.log('Nombre:', formData.name);
    console.log('Detalle:', formData.detail);
    console.log('Imagen seleccionada:', formData.image ? formData.image.name : 'Ninguna imagen seleccionada');
  };

  return (
    <div>
      <h2>Formulario de Carga de Imagen</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="detail">Detalle:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            value={formData.detail}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Imagen:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
}

export default ImageUploadForm;
