import React, { useContext, useEffect } from 'react';
import './AdministrarCaracteristicas.css'
import { GlobalContext } from "../../Context/globalContext";


const AdministrarCaracteristicas = () => {

     /* const token = sessionStorage.getItem('token')
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }*/
  
    const { listaCaracteristicas } = useContext(GlobalContext);

    return (
        <div className="listCaract">
            <h2>Listado de Caracteristicas: </h2>
            <ul className="elementsCaract">
                {listaCaracteristicas.map((caracteristicas) => (
                    <li className='listId' key={caracteristicas.id}>
                        {console.log(caracteristicas)}
                        <div>{caracteristicas.id}</div>
                        <div className='listaTitle'>{caracteristicas.title}</div>
                        {console.log(caracteristicas)}
                        <div className='btnContainer'>
                            <button className='btnDelete'>Eliminar</button>
                            <button className='btnEdit'>Editar</button>
                        </div>
                    </li>
                    
                ))}
                <button className='btnCrear' >Crear Caracteristica</button>
            </ul>
        </div>
    );
}

export default AdministrarCaracteristicas;