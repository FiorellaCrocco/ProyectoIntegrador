import React, { useContext, useEffect } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import './ListarCategoria.css';

const ListarCategoria = () => {
    const { listaCategorias } = useContext(GlobalContext);

    return (
        <div className="categorias-list">
            <h2>Lista de Categorías:</h2>
            <ul className="vertical-list">
                {listaCategorias.map((categoria) => (
                    <li key={categoria.id}>{categoria.titulo}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListarCategoria;
