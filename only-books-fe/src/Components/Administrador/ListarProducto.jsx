/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
//import data from '../LibrosPaginados/libros'
import "./ListarProducto.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
// import label
import { GlobalContext } from "../../Context/globalContext";

const ListarProducto = () => {
  const { listaLibros, isLoading, actualizarListaLibros } = useContext(GlobalContext);
  const [productos, setProductos] = useState([]);

  useEffect(()=>{
      setProductos(listaLibros)
    },[listaLibros,productos])

    const fetchData = async (url,settings) => {
      try {
        const res = await fetch(url,settings);
        if (!res.ok) {
          throw new Error("Error al eliminar el libro");
        }
        const data = await res.text();
      } catch (error) {
        console.log("Error al eliminar el libro", error);
      }
    };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
      
    if (confirmDelete) {
      const updatedProductos = productos.filter(
        (producto) => producto.id !== id
      );
      const settings = {
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
        },
      }
      const url = `http://localhost:8080/book/eliminar/${id}`;
      //  const url = `https://onlybooks.isanerd.club/api/book/eliminar/${id}`;
      await fetchData(url,settings);
      await actualizarListaLibros();
      setProductos(updatedProductos)
    }
}
  return (
    <div>
      <h2 className="tituloListaAdmin">Listado de productos</h2>
      <ul className="listaContainerAdmin">
        {productos.map((libro) => (
          <li className="lista" key={libro.id}>
            <div className="id">{libro.id}</div>
            <div className="nombre">{libro.title}</div>
            <div className="admin-btn-container">
              <Button
                variant="outlined"
                color="error"
                className="btnEdit"
                onClick={() => handleDelete(libro.id)}
              >
                Eliminar
              </Button>
              <Button variant="outlined" color="success" className="btnEdit">
                Editar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarProducto;
