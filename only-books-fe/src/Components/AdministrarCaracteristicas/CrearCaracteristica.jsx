import React, { useState,} from 'react';


function CrearCaracteristica() {
  //const [caracteristica, setCaracteristica] = useState({ titulo: '', icono: ""});
  const token = sessionStorage.getItem('token')
  const [caracteristica, setCaracteristica] = useState({
    title: "",
    icono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaracteristica({
      ...caracteristica,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:8080/caracteristica/agregar";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(caracteristica),
    };

    try {
      const res = await fetch(url, config);

      if (res.status === 200) {
        console.log("Caracteristica creada con éxito");
      } else {
        console.log("Error al crear caracteristica");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return (
    <div>
      <h3>Crear Caracteristica</h3>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          name="title"
          value={caracteristica.title}
          onChange={handleChange}
        />
        <label>Icono</label>
        <input
          type="text"
          name="icono"
          //accept="image/*"  // Esto limita la selección a archivos de imagen
          value={caracteristica.icono}
          onChange={handleChange}
        />
        <button type="submit">Crear Característica</button>
      </form>
    </div>
  );
}

export default CrearCaracteristica;