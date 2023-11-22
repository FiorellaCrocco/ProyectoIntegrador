import React, { useContext, useEffect, useState } from 'react';
import './AdministrarCaracteristicas.css'
import { GlobalContext } from "../../Context/globalContext";
import CrearCaracteristica from "../AdministrarCaracteristicas/CrearCaracteristica";
import Swal from 'sweetalert2'

const AdministrarCaracteristicas = () => {
  const { listaCaracteristicas,fetchCaracteristicas } = useContext(GlobalContext);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [caracteristicaEdit, setCaracteristicaEdit ] = useState({ id: 0, title: "", icono: "" });
  const[actualizar, setActualizar] = useState(false)
  const API_URL= import.meta.env.VITE_API_URL

  async function eliminarCaracteristica(id) {
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro de que deseas eliminar esta característica?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (confirmacion.isConfirmed) {
  const url = `${API_URL}caracteristica/eliminar/${id}`;
   //    const url = `https://onlybooks.isanerd.club/api/caracteristica/eliminar/${id}`;
    const token = sessionStorage.getItem('token');
    const config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 200) {
        console.log("Se eliminó la característica correctamente");
        actualizar==true?setActualizar(false):setActualizar(true)
        // Actualizar la lista de características eliminando la característica
        Swal.fire({
          text: 'Característica eliminada con éxito',
          icon: 'success',
        });
      } else {
        console.error('Error al eliminar característica');
        // Mostrar mensaje de error
        Swal.fire({
          text: 'Error al eliminar característica',
          icon: 'error',
        });
      } 
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
  }
  function abrirPopupEdicion(caracteristica) {
    setCaracteristicaEdit(caracteristica);
    setEditPopupOpen(true);
  }

  function cerrarPopupEdicion() {
    setEditPopupOpen(false);
  }

  async function actualizarCaracteristica() {
    const url = `${API_URL}caracteristica/modificar`;
  //   const url = `https://onlybooks.isanerd.club/api/caracteristica/modificar`;
    const token = sessionStorage.getItem('token');
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(caracteristicaEdit),
    };

    try {
      const response = await fetch(url, config);

      if (response.status === 200) {
        // Actualizar la lista de características con la característica editad
        console.log("Se editó la característica correctamente");
        actualizar==true?setActualizar(false):setActualizar(true)
        cerrarPopupEdicion();
        Swal.fire({
          text: 'Característica editada con éxito',
          icon: 'success',
        });
      } else {
        console.error('Error al editar característica');
        // Mostrar mensaje de error
        Swal.fire({
          text: 'Error al editar característica',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
  useEffect(()=>{
    fetchCaracteristicas();

  },[actualizar])


  return (
    <div className="listCaract">
      <h2>Listado de Caracteristicas: </h2>
      <ul className="elementsCaract">
        {listaCaracteristicas.map((caracteristica) => (
          <li className='listId' key={caracteristica.id}>
            <div>{caracteristica.id}</div>
            <div className='listaTitle'>{caracteristica.title}</div>
            <div className='btnContainer'>
              <button
                className='btnDelete'
                onClick={() => eliminarCaracteristica(caracteristica.id)}
              >
                Eliminar
              </button>
              <button className='btnEditCaracteristica' onClick={() => abrirPopupEdicion(caracteristica)}>
                Editar
              </button>
              
            </div>
          </li>
        ))}
      </ul>
      {editPopupOpen && (
        <div className="editPopup">
          <h3>Editar Característica</h3>
          <label>Título:</label>
          <input
            type="text"
            value={caracteristicaEdit.title}
            onChange={(e) => setCaracteristicaEdit({ ...caracteristicaEdit, title: e.target.value })}
          />
        {/*   <label>Icono:</label>
          <input
            type="text"
            value={caracteristicaEdit.icono}
            onChange={(e) => setCaracteristicaEdit({ ...caracteristicaEdit, icono: e.target.value })}
          /> */}
          <button onClick={actualizarCaracteristica}>Guardar</button>
          <button onClick={cerrarPopupEdicion}>Cancelar</button>
          {/* Puedes agregar aquí los campos de edición y lógica de actualización */}
        </div>
      )}
      <CrearCaracteristica />
    </div>
  );
}

export default AdministrarCaracteristicas;