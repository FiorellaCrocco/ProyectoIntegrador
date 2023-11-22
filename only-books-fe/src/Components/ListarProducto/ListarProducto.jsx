import React, { useContext, useEffect, useState } from "react";
import "./ListarProducto.css";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { GlobalContext } from "../../Context/globalContext";
import EditarProducto from "../EditarProducto/EditarProducto";
import Swal from 'sweetalert2'

const ListarProducto = () => {
  const { listaLibros, actualizarListaLibros,fetchBookById } = useContext(GlobalContext);
  const [productos, setProductos] = useState([]);
  const API_URL= import.meta.env.VITE_API_URL

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
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro de que deseas eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    });
  
    if (confirmacion.isConfirmed) {
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
       const url = `${API_URL}book/eliminar/${id}`;
   //    const url = `https://onlybooks.isanerd.club/api/book/eliminar/${id}`;
    try{
      await fetchData(url, settings);
      await actualizarListaLibros();
      setProductos(updatedProductos)
      Swal.fire({
        text: 'Producto eliminado con éxito',
        icon: 'success',
      });
    } catch (error) {
      console.error('Error de red:', error);
      // Mostrar mensaje de error
      Swal.fire({
        text: 'Error al eliminar el libro',
        icon: 'error',
      });
    }
    }
  }

  return (
    <div >
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
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

      </ul>
    </div>
  );
};

export default ListarProducto;
