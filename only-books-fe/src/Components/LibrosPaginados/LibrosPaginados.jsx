import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Card from "../Card/Card.jsx"; // Importa el componente Card
import './LibrosPaginados.css';

function LibrosPaginados({ libros, isLoading, librosFiltrados, librosReservados, totalLibros }) {
    const librosPorPagina = 10;
    const [pagina, setPagina] = useState(1);
    const [listaFavoritos, setListaFavoritos] = useState([])

    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("userData"));
    const userId = user ? user.id : null;

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchDataMostrar = async () => {
        try {
            const url = `${API_URL}user/mostrarFav/${userId}`;
            const set = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(url, set);
            const data = await response.json(); // Parsear el cuerpo de la respuesta

            if (response.ok) {
                //console.log("Lista de libros favoritos:", data);
                // Aquí puedes realizar la lógica basada en la lista de libros favoritos
                // Por ejemplo, puedes establecer el estado basándote en si la lista no está vacía

                setListaFavoritos(data);
                console.log(data)
            } else {
                throw new Error("Error al realizar la operación");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const actualizarListaFav = () => {
        fetchDataMostrar()
    }

    useEffect(() => {
        if (userId) {
            fetchDataMostrar()
        }
    }, [userId])

    useEffect(() => {
        renderCards();
    }, [listaFavoritos])




    // Calculo el total de paginas
    const totalPaginas = Math.ceil(libros.length / librosPorPagina);

    const startIndex = (pagina - 1) * librosPorPagina;
    const endIndex = startIndex + librosPorPagina;
    const librosSinReserva = libros.filter(libro => !librosReservados.includes(libro.id))

    let librosBusqueda = librosSinReserva;

    if (librosFiltrados.length > 0) {
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

        return currentItem.map((item) => {
            if (listaFavoritos.some((favorito) => favorito.id == item.id)) {
                return <Card key={item.id} {...item} isFavorite={true} actualizarListaFav={actualizarListaFav} />
            } else {
                return <Card key={item.id} {...item} isFavorite={false} actualizarListaFav={actualizarListaFav} />
            }
        }
        );
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
