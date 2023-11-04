/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import './Search.css';
import { GlobalContext } from "../../Context/globalContext";
import LibrosPaginados from '../LibrosPaginados/LibrosPaginados';
import Recomendados from '../Recomendados/Recomendados';

const Search = () => {
    const { listaLibros, isLoading, listaCategorias } = useContext(GlobalContext);
    const [listaAleatoria, setListaAleatoria] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState([]);

    const selectLibrosAleatorios = (libros, cantidad) => {
        const librosSeleccionados = [];
        while (librosSeleccionados.length < cantidad) {
            const randomIndex = Math.floor(Math.random() * libros.length);
            if (!librosSeleccionados.includes(libros[randomIndex])) {
                librosSeleccionados.push(libros[randomIndex]);
            }
        }
        return librosSeleccionados;
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (selectedCategory.includes(category)) {
            setSelectedCategory(selectedCategory.filter((c) => c !== category));
        } else {
            setSelectedCategory([...selectedCategory, category]);
        }
    };

    useEffect(() => {
        const listaAleatoria = selectLibrosAleatorios(
            listaLibros,
            listaLibros.length
        );
        setListaAleatoria(listaAleatoria);
    }, [listaLibros]);

    const renderCategoryOptions = () => {
        const categorias = listaCategorias;

        return categorias.map((category, index) => (
            <div key={index} className="category-square">
                <img src={category.imagen} alt={category.titulo} />
                <label>
                    <input
                        type="checkbox"
                        value={category.titulo}
                        checked={selectedCategory.includes(category.titulo)}
                        onChange={handleCategoryChange}
                    />
                    {category.titulo}
                </label>
            </div>
        ));
    };

    const renderProductRecommendations = () => {
        const filteredProducts = listaAleatoria.filter((product) => {
            if (selectedCategory.length == 0 || selectedCategory == "") {
                return true;
            } else {
                return (
                    product.categorias &&
                    product.categorias.some((categoria) =>
                        selectedCategory.includes(categoria.titulo)
                    )
                );
            }
        });
        return filteredProducts;
    };
    return (
        <>

            <div className="search-container">
                <div className='input-select'>
                    <div className="category-select">
                        {renderCategoryOptions()}
                    </div>
                </div>
            </div>
            <Recomendados libros={listaLibros}></Recomendados>
            <LibrosPaginados libros={renderProductRecommendations()} isLoading={isLoading}></LibrosPaginados>
        </>
    );
}
export default Search;