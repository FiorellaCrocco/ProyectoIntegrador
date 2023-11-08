import React, { useContext, useEffect, useState } from "react";
import "./ListarProducto.css";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { GlobalContext } from "../../Context/globalContext";
import EditarProducto from "../EditarProducto/EditarProducto";

const ListarProducto = () => {
  const { listaLibros, actualizarListaLibros,fetchBookById } = useContext(GlobalContext);
  const [productos, setProductos] = useState([]);

  //Para la  funcionalidad de EDITAR
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const token = sessionStorage.getItem('token')


  const handleEditOpen = async (product) => {
    const book = await fetchBookById(product.id)
    console.log(book)
    setSelectedProduct(book);
    
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleUpdateList = async () => {
    // Actualizar la lista de productos
    await actualizarListaLibros();
  };


  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    setProductos(listaLibros)
  }, [listaLibros, productos])

  const fetchData = async (url, settings) => {
    try {
      const res = await fetch(url, settings);
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
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
      const url = `http://localhost:8080/book/eliminar/${id}`;
      //  const url = `https://onlybooks.isanerd.club/api/book/eliminar/${id}`;
      await fetchData(url, settings);
      await actualizarListaLibros();
      setProductos(updatedProductos)
    }
  }

  return (
    <div className="listaProductosAdmin">
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
              <Button
                variant="outlined"
                color="success"
                className="btnEdit"
                onClick={() => handleEditOpen(libro)}
              >
                Editar
              </Button>
            </div>
          </li>
        ))}

        <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
          <DialogContent>
            {selectedProduct && <EditarProducto product={selectedProduct} onUpdateList={handleUpdateList} />}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

      </ul>
    </div>
  );
};

export default ListarProducto;
