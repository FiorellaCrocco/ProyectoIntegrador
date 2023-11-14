/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import "./EditarProducto";
import { GlobalContext } from "../../Context/globalContext";
import Swal from 'sweetalert2'

const EditarProducto = ({ product, onUpdateList }) => {
  const { listaCategorias, listaCaracteristicas, actualizarCategorias } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState(product);
  const [selectedCategory, setSelectedCategory] = useState(product.categorias);
  const [selectedCaracteristica, setSelectedCaracteristica] = useState(
    product.caracteristicas
  );
  const [editOpen, setEditOpen] = useState(false);
  const [editCaracteristicaOpen, setEditCaracteristicaOpen] = useState(false);
  const [lanzarFetch, setLanzarFetch] = useState(false);

  const updateProductUrl = `http://localhost:8080/book/modificar`;
  // const updateProductUrl = "https://onlybooks.isanerd.club/api/book/modificar"

  const token = sessionStorage.getItem("token");

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditCaracteristicaClose = () => {
    setEditCaracteristicaOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevSelectedCategory) => {
      if (prevSelectedCategory.some((obj) => obj.titulo === category.titulo)) {
        return prevSelectedCategory.filter((c) => c.titulo !== category.titulo);
      } else {
        return [...prevSelectedCategory, category];
      }
    });
  };

  const handleCaracteristicaChange = (caracteristica) => {
    setSelectedCaracteristica((prevSelectedCaracteristica) => {
      if (
        prevSelectedCaracteristica.some(
          (obj) => obj.title === caracteristica.title
        )
      ) {
        return prevSelectedCaracteristica.filter(
          (c) => c.title !== caracteristica.title
        );
      } else {
        return [...prevSelectedCaracteristica, caracteristica];
      }
    });
  };

  const renderCaracteristicaOptions = useMemo(() => {
    const caracteristica = listaCaracteristicas;
    return caracteristica.map((caracteristica, index) => {
      const isSelected = selectedCaracteristica.some(
        (obj) => obj.title == caracteristica.title
      );
      return (
        <div
          key={index}
          className={`${isSelected ? "selected" : ""}`}
          onClick={() => handleCaracteristicaChange(caracteristica)}
        >
          <label value={caracteristica}>{caracteristica.title.toUpperCase()}</label>
        </div>
      );
    });
  }, [product, listaCaracteristicas, selectedCaracteristica]);

  const renderCategoryOptions = useMemo(() => {
    const categorias = listaCategorias;
    return categorias.map((category, index) => {
      const isSelected = selectedCategory.some(
        (obj) => obj.titulo == category.titulo
      );
      return (
        <div
          key={index}
          className={`${isSelected ? "selected" : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          <label value={category}>{category.titulo}</label>
        </div>
      );
    });
  }, [product, listaCategorias, selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function fetchCategoria(bookId, categoriaId) {
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:8080/book/${bookId}/categoria/${categoriaId}`;
    // const url = `https://onlybooks.isanerd.club/api/book/${bookId}/categoria/${categoriaId}`;
    try {
      const response = await fetch(url, settings);
      const data = await response.text();
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  async function fetchCaracteristica(bookId, caracteristicaId) {
    console.log(caracteristicaId)
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:8080/book/${bookId}/caracteristica/${caracteristicaId}`;
    // const url = `https://onlybooks.isanerd.club/api/book/${bookId}/caracteristica/${caracteristicaId}`;
    try {
      const response = await fetch(url, settings);
      const data = await response.text();
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  //method PATCH en lugar de PUT si que podemos agregarlo al back, sino dejarlo en PUT
  //PATCH es un método HTTP utilizado para actualizar parcialmente un recurso, y es útil
  //cuando deseas modificar solo ciertos campos de un objeto sin reemplazarlo por completo.

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setFormData({
      ...formData,
      categorias: [],
      caracteristicas:[]
    });
    setLanzarFetch(true)
    
  };


  useEffect(() => {
    const fetchData = async () => {
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
          for (const category of selectedCategory) {
            await fetchCategoria(product.id, category.id);
          }
          for (const caracteristica of selectedCaracteristica) {
            await fetchCaracteristica(product.id, caracteristica.id);
          }
          onUpdateList();
         // Mensaje de éxito
         Swal.fire({
          position: "top-end",
          icon: "success",
          text: 'Producto modificado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
    } else {
      // Mensaje de error
      console.error("Error al modificar el producto");
      Swal.fire({
        position: "top-end",
        text: 'Error al modificar el producto',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
    }
      } catch (error) {
        console.error("Error al modificar el producto:", error);
        Swal.fire({
          position: "top-end",
          text: 'Error al modificar el producto',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    };
    if(lanzarFetch){
      fetchData();
      setLanzarFetch(false)
    }
  }, [lanzarFetch]);

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
            <button type="button" onClick={() => setEditOpen(true)}>
              Editar Categoria
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="caracteristicas">Características:</label>
            <button
              type="button"
              onClick={() => setEditCaracteristicaOpen(true)}
            >
              Editar Características
            </button>
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


      <Dialog
        open={editCaracteristicaOpen}
        onClose={handleEditCaracteristicaClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {listaCaracteristicas && renderCaracteristicaOptions}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCaracteristicaClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditarProducto;