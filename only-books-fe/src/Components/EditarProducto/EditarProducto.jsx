/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import "./EditarProducto";
import { GlobalContext } from "../../Context/globalContext";

const EditarProducto = ({ product, onUpdateList }) => {
    const [formData, setFormData] = useState(product);

    
    const updateProductUrl = `http://localhost:8080/book/modificar`;
    // const updateProductUrl = "https://onlybooks.isanerd.club/api/book/modificar"
    
    const token = sessionStorage.getItem('token')


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function fetchCategoriaCaracteristica(bookId,categoriaId){
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    };
      const url = `http://localhost:8080/book/${bookId}/categoria/${categoriaId}`;
      try{
        const response = await fetch(url,settings)
        const data = await response.text()
        console.log(data)
      }catch(error){
        console.error("ERROR:",error)
      }

  }

  //method PATCH en lugar de PUT si que podemos agregarlo al back, sino dejarlo en PUT
  //PATCH es un método HTTP utilizado para actualizar parcialmente un recurso, y es útil
  //cuando deseas modificar solo ciertos campos de un objeto sin reemplazarlo por completo.

  const handleSubmit = async (e) => {
    e.preventDefault();

    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(updateProductUrl, settings);
      if (response.ok) {
        console.log("Producto modificado correctamente");
        for (const category of selectedCategory) {
            await fetchCategoriaCaracteristica(product.id, category.id);
          }
        onUpdateList();
      } else {
        console.error("Error al modificar el producto");
      }
    } catch (error) {
      console.error("Error al modificar el producto:", error);
    }
  };

  return (
    <div>
      {product && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Autor:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isbn">ISBN:</label>
            <input
              type="number"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publication_year">Año de Publicación:</label>
            <input
              type="date"
              name="publication_year"
              value={formData.publication_year.substring(0, 10)}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="qualification">Calificación:</label>
            <input
              type="number"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
            />
          </div>
          {
            //CORREGIR MAS TARDE
            /*
            <div className="form-group">
            <label htmlFor="imagesBase64">Imagen:</label>
            <input
              type="text"
              name="imagesBase64"
              value={formData.imagesBase64}
              onChange={handleInputChange}
            />
          </div>
            */
          }
          
          <div className="form-group">
            <label htmlFor="categorias">Categoría:</label>
            <button type="button" onClick={()=>setEditOpen(true)}>
              Editar Categoria
            </button>
          </div>


          <div className="form-group">
            <label htmlFor="caracteristicas">Características:</label>
            <input
              type="text"
              name="caracteristicas"
              value={formData.caracteristicas}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn-dialog" type="submit">
            Guardar Cambios
          </button>
        </form>
      )}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogContent>
          {listaCategorias && renderCategoryOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarProducto;

// Titulo x
// Autor x
// Descripcion  x
// isbn  x (numerico)
// Año de publicacion  x
// Precio x
// Calificacion x
// Imagen
// Categoria
// Caracteristicas
