/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import data from '../LibrosPaginados/libros'
import "./ListarProducto.css"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ListarProducto = () => {

  const [productos, setProductos] = useState(data);

  // IMPLEMENTACION DE REFERENCIA, SOLO BORRA DE MANERA LOCAL, AL REFRESCAR LA PAGINA VUELVE A CARGAR LOS DATOS
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      const updatedProductos = productos.filter((producto) => producto.id !== id);
      setProductos(updatedProductos);
    }
  };



  return (
    <div>
      <h2 className='titulo'>Listado de productos</h2>
      <ul className='listaContainer'>

        {productos.map((libro) => (
          <li className='lista' key={libro.id}>
            <div className='id'>{libro.id}
            </div>
            <div className='nombre'>{libro.title}</div>
            <div  className='admin-btn-container'>
              {/* <button className='btnEdit' onClick={() => handleDelete(libro.id)}>Eliminar</button> */}
              <Button variant="outlined" color="error" className='btnEdit' onClick={() => handleDelete(libro.id)}>
                Eliminar
              </Button>
              {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
                Eliminar
              </Button> */}
              <Button variant="outlined" color="success" className='btnEdit' >
                Editar
              </Button>
              {/* <button className='btnEdit'>Editar</button> */}

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListarProducto
