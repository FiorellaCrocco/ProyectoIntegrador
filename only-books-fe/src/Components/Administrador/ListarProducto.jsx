import React from 'react'
import data from '../LibrosPaginados/libros'
import "./ListarProducto.css"


const ListarProducto = () => {
  return (
    <div>
      <h2 className='titulo'>Listado de productos</h2>
      <ul className='contenedor'>
        {data.map((libro) => (
          <li className='lista' key={libro.id}>{libro.id}{libro.title}</li>
        ))}
      </ul>
  
      
  
    </div>
  )
}

export default ListarProducto
