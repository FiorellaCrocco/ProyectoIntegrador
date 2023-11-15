import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Card from "../Card/Card.jsx"; // Importa el componente Card
import './LibrosPaginados.css';

function LibrosPaginados({ libros, isLoading, fechaInicio, fechaFin, librosFiltrados, librosReservados, totalLibros }) {
    const librosPorPagina = 10;
    const [pagina, setPagina] = useState(1);

    // Calculo el total de paginas
    const totalPaginas = Math.ceil(libros.length / librosPorPagina);

    const startIndex = (pagina - 1) * librosPorPagina;
    const endIndex = startIndex + librosPorPagina;
    const librosSinReserva = libros.filter(libro => !librosReservados.includes(libro.id))

  let librosBusqueda=librosSinReserva;

    if (librosFiltrados.length > 0) {
        console.log(librosSinReserva);
        librosBusqueda = librosSinReserva.filter(libro => librosFiltrados.some(filtrado => filtrado.id == libro.id))
    } else {
        librosBusqueda = librosSinReserva;
    }

    const currentItem = librosBusqueda.slice(startIndex, endIndex);

    const nextPage = () => {
        if (pagina < totalPaginas) {
            setPagina(pagina + 1);
        }
    };

    const prevPage = () => {
        if (pagina > 1) {
            setPagina(pagina - 1);
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPaginas) {
            setPagina(pageNumber);
        }
    };

    const renderCards = () => {
        
        return currentItem.map((item) => (
            <Card key={item.id} {...item} />
        ));
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPaginas; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`btn-siguiente ${i === pagina ? 'pagina-actual' : ''}`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="listaContainer">
            {isLoading ? <div className="loader"></div> : null}
            <h4 className="cantLibros">Cantidad de libros: {currentItem.length}/{totalLibros}</h4>
            <ul className="listaPaginada">{renderCards()}</ul>
            <div className="btn-container">
                <button
                    className="btn-anterior"
                    onClick={prevPage}
                    disabled={pagina === 1}
                >
                    Anterior
                </button>
                {renderPageButtons()}
                <button
                    className="btn-siguiente"
                    onClick={nextPage}
                    disabled={pagina === totalPaginas}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default LibrosPaginados;
