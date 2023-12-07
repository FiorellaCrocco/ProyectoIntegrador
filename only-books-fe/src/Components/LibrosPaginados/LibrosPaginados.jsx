import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Card from "../Card/Card.jsx"; // Importa el componente Card
import "./LibrosPaginados.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

function LibrosPaginados({
  libros,
  isLoading,
  setIsLoading,
  librosFiltrados,
  librosReservados,
  totalLibros,
  fechaInicio,
  fechaFin,
}) {
  const { favoritos, storedFilters } = useContext(GlobalContext);
  const librosPorPagina = 10;
  const [pagina, setPagina] = useState(1);
  const [listaFavoritos, setListaFavoritos] = useState([]);

  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchDataMostrar = async () => {
    setIsLoading(true)

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
        console.log(data);
      } else {
        setIsLoading(false)
        throw new Error("Error al realizar la operación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false)
  };

  const actualizarListaFav = () => {
    fetchDataMostrar();
  };

  useEffect(() => {
    if (userId) {
      fetchDataMostrar();
    }
  }, [userId]);

  useEffect(() => {
    renderCards();
    setPagina(1);
    console.log(favoritos);
  }, [listaFavoritos, librosReservados, userId, favoritos]);

  // Calculo el total de paginas

  const startIndex = (pagina - 1) * librosPorPagina;
  const endIndex = startIndex + librosPorPagina;
  const listaReservados = librosReservados;
  const librosSinReserva = libros.filter(
    (libro) => !listaReservados.includes(libro.id)
  );

  let librosBusqueda = librosSinReserva;

  if (librosFiltrados.length > 0) {
    librosBusqueda = librosSinReserva.filter((libro) =>
      librosFiltrados.some((filtrado) => filtrado.id == libro.id)
    );
  } else {
    librosBusqueda = librosSinReserva;
  }
  const totalPaginas = Math.ceil(librosBusqueda.length / librosPorPagina);
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
    console.log(currentItem);
    if (listaFavoritos.length !== 0) {
      return currentItem.map((item) => {
        if (listaFavoritos.some((favorito) => favorito.id === item.id)) {
          console.log(item.id);
          return (
            <Card
              key={item.id}
              {...item}
              libro = {item}
              isFavorite={true}
              actualizarListaFav={actualizarListaFav}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
            />
          );
        } else {
          return (
            <Card
              key={item.id}
              {...item}
              isFavorite={false}
              actualizarListaFav={actualizarListaFav}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              libro={item}
            />
          );
        }
      });
    } else {
        return currentItem.map((item) => {
          return (
            <Card
              key={item.id}
              {...item}
              isFavorite={false}
              actualizarListaFav={actualizarListaFav}
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              libro={item}
            />
          );
        });
      }
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPaginas; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`btn-siguiente ${i === pagina ? "pagina-actual" : ""}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="listaContainer">
      {isLoading ? <div className="custom-loader"></div> : null}
      <h4 className="cantLibros">
        Cantidad de libros: {currentItem.length}/{totalLibros}
      </h4>
      <ul className="listaPaginada">{renderCards()}</ul>
      <div className="btn-container">
        <button
          className={pagina === 1 ? "btn-anterior disable" : "btn-anterior"}
          onClick={prevPage}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        {renderPageButtons()}
        <button
          className={
            pagina === totalPaginas ? "btn-siguiente disable" : "btn-siguiente"
          }
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
