/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditarProducto = ({ product }) => {
    const [formData, setFormData] = useState(product);

    const params = useParams();
    const updateProductUrl = `http://localhost:8080/book/modificar`;


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
            },
            body: JSON.stringify(formData),
        };

        try {
            const response = await fetch(updateProductUrl, settings);
            if (response.ok) {
                console.log('Producto modificado correctamente');
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
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="publication_year"
                        value={formData.publication_year}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="imagesBase64"
                        value={formData.imagesBase64}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="categorias"
                        value={formData.categorias}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="caracteristicas"
                        value={formData.caracteristicas}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Guardar Cambios</button>
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