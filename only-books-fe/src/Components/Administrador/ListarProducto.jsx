/* eslint-disable no-unused-vars */
import React from 'react'
import data from '../LibrosPaginados/libros'
import "./ListarProducto.css"


const ListarProducto = () => {
  return (
    <div>
      <h2 className='titulo'>Listado de productos</h2>
      <ul className='listaContainer'>
        
        {data.map((libro) => (
          <li className='lista' key={libro.id}>
            <div className='id'>{libro.id}
            </div>
            <div className='nombre'>{libro.title}</div>
            <div >
              <button className='btnEdit'>Eliminar</button>
              <button className='btnEdit'>Editar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListarProducto
