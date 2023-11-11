/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import './Search.css';
import { GlobalContext } from "../../Context/globalContext";
import LibrosPaginados from '../LibrosPaginados/LibrosPaginados';
import Recomendados from '../Recomendados/Recomendados';

const Search = () => {
    const { listaLibros, isLoading, listaCategorias } = useContext(GlobalContext);
    const [listaAleatoria, setListaAleatoria] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    const handleCategoryChange = (category) => {
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

    useEffect(() => {
        const listaFiltrada = listaAleatoria.filter((product) => {
            if (selectedCategory.length === 0 || selectedCategory === "") {
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
        setFilteredProducts(listaFiltrada);
    }, [selectedCategory, listaAleatoria]);

    const renderCategoryOptions = () => {
        const categorias = listaCategorias;
        return categorias.map((category, index) => (
            <div key={index} className={`category-square  ${selectedCategory.includes(category.titulo) ? 'selected' : ''}`}>
                <img src={category.imagen} alt={category.titulo}
                    onClick={() => handleCategoryChange(category.titulo)} />
                <label value={category.titulo}>
                    {category.titulo}
                </label>
            </div>
        ));
    };

    return (
        <div >
            <Recomendados libros={listaLibros}></Recomendados>
            <div className="search-container">
                <div className='input-select'>
                    <div >
                        <div>
                            <h2 className='category-title'>Categorias</h2>
                        </div>
                        <div className="category-select">
                            {renderCategoryOptions()}
                        </div>
                        <div>
                            <button className="clearCategorybtn" onClick={() => { setSelectedCategory([]) }}>X
                        </button></div>
                    </div>
                </div>
                <LibrosPaginados libros={filteredProducts} isLoading={isLoading}></LibrosPaginados>
            </div>

        </div>
    );
}
export default Search;