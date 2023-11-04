/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from "../../Context/globalContext";

const ListarCategoria = () => {

    const { listaCategorias } = useContext(GlobalContext);
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {
        setCategorias(listaCategorias)
    }, [listaCategorias, categorias])

    return (
        <div>
            ListarCategoria
            <ul>
                {categorias.map((categoria) => (
                    <li key={categoria.id}>{categoria.nombre}</li>
                ))}
            </ul>
        </div>
    )
}

export default ListarCategoria