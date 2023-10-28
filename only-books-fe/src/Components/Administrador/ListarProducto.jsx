/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
//import data from '../LibrosPaginados/libros'
import "./ListarProducto.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { GlobalContext } from "../../Context/globalContext";

const ListarProducto = () => {
  const { listaLibros, isLoading } = useContext(GlobalContext);
  const [productos, setProductos] = useState(listaLibros);
  console.log(listaLibros)
  useEffect(()=>{
    if(!isLoading){
    setProductos(listaLibros)
    }
  },[isLoading,listaLibros])
  


  // IMPLEMENTACION DE REFERENCIA, SOLO BORRA DE MANERA LOCAL, AL REFRESCAR LA PAGINA VUELVE A CARGAR LOS DATOS
  const handleDelete = (id) => {
    const settings = {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
      },
    }
    const url = `http://localhost:8080/book/eliminar/${id}`;
    const fetchData = async () => {
      try {
        const res = await fetch(url,settings);
        if (!res.ok) {
          throw new Error("Error al eliminar el libro");
        }
        const data = await res.json();
      } catch (error) {
        console.log("Error al eliminar el libro", error);
      }
    };

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (confirmDelete) {
      fetchData();
      const updatedProductos = productos.filter(
        (producto) => producto.id !== id
      );
      setProductos(updatedProductos);
    }
  };

  return (
    <div>
      <h2 className="tituloListaAdmin">Listado de productos</h2>
      <ul className="listaContainerAdmin">
        {productos.map((libro) => (
          <li className="lista" key={libro.id}>
            <div className="id">{libro.id}</div>
            <div className="nombre">{libro.title}</div>
            <div className="admin-btn-container">
              {/* <button className='btnEdit' onClick={() => handleDelete(libro.id)}>Eliminar</button> */}
              <Button
                variant="outlined"
                color="error"
                className="btnEdit"
                onClick={() => handleDelete(libro.id)}
              >
                Eliminar
              </Button>
              {/* <Button variant="outlined" startIcon={<DeleteIcon />}>
                Eliminar
              </Button> */}
              <Button variant="outlined" color="success" className="btnEdit">
                Editar
              </Button>
              {/* <button className='btnEdit'>Editar</button> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProducto;
