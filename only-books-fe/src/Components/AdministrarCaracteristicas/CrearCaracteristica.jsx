import React, { useState, useContext, useEffect} from 'react';
import { GlobalContext } from "../../Context/globalContext";
import Swal from 'sweetalert2';

function CrearCaracteristica() {
  //const [caracteristica, setCaracteristica] = useState({ titulo: '', icono: ""});
  const token = sessionStorage.getItem('token')
  const [caracteristica, setCaracteristica] = useState({
    title: "",
    icono: "",
  });
  const[actualizar, setActualizar] = useState(false)
  const { listaCaracteristicas,fetchCaracteristicas } = useContext(GlobalContext);

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
 // const url = `https://onlybooks.isanerd.club/api/caracteristica/agregar`;
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
        actualizar==true?setActualizar(false):setActualizar(true)
        Swal.fire({
          text: 'Característica creada con éxito',
          icon: 'success',
        });
      } else {
        console.log("Error al crear caracteristica");
        // Mostrar mensaje de error
        Swal.fire({
          text: 'Error al crear característica',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
    setCaracteristica({
      title: "",
      icono: "",
    });
  }
  useEffect(()=>{
    fetchCaracteristicas();

  },[actualizar])

  return (
    <div className='editPopup'>
      <h3>Crear Caracteristica</h3>
      
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
        <button  onClick={handleSubmit} type="submit">Crear Característica</button>
      
    </div>
  );
}

export default CrearCaracteristica;