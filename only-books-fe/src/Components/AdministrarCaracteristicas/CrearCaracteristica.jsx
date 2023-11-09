import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function CrearCaracteristica() {
  //const [caracteristica, setCaracteristica] = useState({ titulo: '', icono: ""});
  const token = sessionStorage.getItem("token");
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [caracteristica, setCaracteristica] = useState({
    title: "",
    icono: null,
  });

  const [actualizar, setActualizar] = useState(false);
  const { listaCaracteristicas, fetchCaracteristicas } =
    useContext(GlobalContext);

  const handlePopUp = (e) => {
    editPopupOpen==true?setEditPopupOpen(false):setEditPopupOpen(true)
  };
  function cerrarPopupCrear() {
    setEditPopupOpen(false);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaracteristica({
      ...caracteristica,
      [name]: value,
    });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Utiliza e.target.files[0] en lugar de e.target.file
    const base64Data = await readFileAsBase64(file);
    setCaracteristica(() => {
      return {
        ...caracteristica, // Asegúrate de mantener el resto de las propiedades
        icono: base64Data,
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
    const url = "http://localhost:8080/caracteristica/agregar";
    // const url = `https://onlybooks.isanerd.club/api/caracteristica/agregar`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(caracteristica),
    };

    try {
      const res = await fetch(url, config);

      if (res.status === 200) {
        console.log("Caracteristica creada con éxito");
        actualizar == true ? setActualizar(false) : setActualizar(true);
        Swal.fire({
          text: "Característica creada con éxito",
          icon: "success",
        });
      } else {
        console.log("Error al crear caracteristica");
        // Mostrar mensaje de error
        Swal.fire({
          text: "Error al crear característica",
          icon: "error",
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
  useEffect(() => {
    fetchCaracteristicas();
  }, [actualizar]);

  return (
    <>
      {editPopupOpen && (
        <div className="editPopup">
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
            className="input"
            type="file"
            name="icono"
            //accept="image/*"  // Esto limita la selección a archivos de imagen
            //value={caracteristica.icono}
            onChange={handleImageChange}
          />
          <button onClick={handleSubmit} type="submit">Crear Caracteristica</button>
        </div>
      )}
      <button  className="btnEditCaracteristica" onClick={() => handlePopUp()} type="submit">
        {
          editPopupOpen?"Cerrar":"Agregar Caracteristica"
        }
        
      </button>
    </>
  );
}

export default CrearCaracteristica;
