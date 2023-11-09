import React, { useContext, useEffect } from 'react';
import './AdministrarCaracteristicas.css'
import { GlobalContext } from "../../Context/globalContext";
import CrearCaracteristica from "../AdministrarCaracteristicas/CrearCaracteristica"


const AdministrarCaracteristicas = () => {

   
    const { listaCaracteristicas } = useContext(GlobalContext);

    async function eliminarCaracteristica(id) {
        const url = `http://localhost:8080/caracteristica/eliminar/${id}`;
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
            console.log("se elimino la caracteristica correctamente");
          } else {
            console.error('Error al eliminar característica');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      }

      

      

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
                        <button className='btnEdit'>Editar</button>
                    </div>
                </li>
            ))}
                
            </ul>
            <CrearCaracteristica/>
        </div>
    );
}

export default AdministrarCaracteristicas;