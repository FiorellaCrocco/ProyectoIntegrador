/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { GlobalContext } from "../../Context/globalContext";
import './LibrosPaginados.css'

function LibrosPaginados({ libros }) {
    const librosPorPagina = 10;
    const [pagina, setPagina] = useState(1)
    //const { listaLibros }= useContext(GlobalContext)

    //Calculo el total de paginas
    const totalPaginas = Math.ceil(libros.length / librosPorPagina)

    const startIndex = (pagina - 1) * librosPorPagina
    const endIndex = startIndex + librosPorPagina
    const currentItem = libros.slice(startIndex, endIndex)

    const nextPage = () => {
        if (pagina < Math.ceil(libros.length / librosPorPagina)) {
            setPagina(pagina + 1)
        }
    }
    const prevPage = () => {
        if (pagina > 1) {
            setPagina(pagina - 1)
        }
    }

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPaginas) {
            setPagina(pageNumber);
        }
    }
    const pageButtons = [];
    for (let i = 1; i <= totalPaginas; i++) {
        pageButtons.push(
            <button key={i} onClick={() => goToPage(i)} className={` btn-siguiente ${i === pagina ? 'pagina-actual' : ''}`}>
                {i}
            </button>
        );
    }
    return (
        <>
            <div className="listaContainer">
                <ul className="listaPaginada">
                    {currentItem.map((item) => {
                        return (
                            <li className="book" key={item.id}>
                                <Link to={`/detail/${item.id}`}>
                                    <img src={item.imgUrl[0]} alt={item.title} />
                                </Link>
                                <p className="title">{item.title}</p>
                                <p className="price">${item.price}</p>
                            </li>)
                    })}
                </ul>
                <div className="btn-container">
                    <button className="btn-anterior" onClick={prevPage} disabled={pagina === 1}>
                        Anterior
                    </button>
                    {pageButtons}
                    <button className="btn-siguiente" onClick={nextPage} disabled={pagina === Math.ceil(libros.length / librosPorPagina)}>
                        Siguiente
                    </button>
                </div>
            </div>
        </>
    )
}

export default LibrosPaginados
