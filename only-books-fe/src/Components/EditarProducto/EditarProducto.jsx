/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./EditarProducto";

const EditarProducto = ({ product, onUpdateList }) => {
    const [formData, setFormData] = useState(product);

    
    const updateProductUrl = `http://localhost:8080/book/modificar`;
    // const url = "https://onlybooks.isanerd.club/api/book/modificar"
    
    const token = sessionStorage.getItem('token')


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //method PATCH en lugar de PUT si que podemos agregarlo al back, sino dejarlo en PUT
    //PATCH es un método HTTP utilizado para actualizar parcialmente un recurso, y es útil 
    //cuando deseas modificar solo ciertos campos de un objeto sin reemplazarlo por completo.

    const handleSubmit = async (e) => {
        e.preventDefault();
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        };

        try {
            const response = await fetch(updateProductUrl, settings);
            if (response.ok) {
                console.log('Producto modificado correctamente');
                onUpdateList();
            } else {
                console.error('Error al modificar el producto');
            }
        } catch (error) {
            console.error('Error al modificar el producto:', error);
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
                            type="number"
                            name="publication_year"
                            value={formData.publication_year}
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
                    <div className="form-group">
                        <label htmlFor="imagesBase64">Imagen:</label>
                        <input
                            type="text"
                            name="imagesBase64"
                            value={formData.imagesBase64}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categorias">Categoría:</label>
                        <input
                            type="text"
                            name="categorias"
                            value={formData.categorias}
                            onChange={handleInputChange}
                        />
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
                    <button className="btn-dialog" type="submit">Guardar Cambios</button>
                </form>
            )}
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