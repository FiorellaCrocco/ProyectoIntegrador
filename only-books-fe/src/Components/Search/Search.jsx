/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import "./Search.css";
import { GlobalContext } from "../../Context/globalContext";
import LibrosPaginados from "../LibrosPaginados/LibrosPaginados";
import Recomendados from "../Recomendados/Recomendados";
import Buscador from "../Buscador/Buscador";

const Search = () => {
  const {
    listaLibros,
    isLoading,
    listaCategorias,
    rentBook,
    isLoadingRent,
    guardarFiltros,
    filtrosSeleccionados,
  } = useContext(GlobalContext);
  const [listaAleatoria, setListaAleatoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [librosReservados, setLibrosReservados] = useState([]);


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
      if (filtrosSeleccionados.length === 0 || filtrosSeleccionados === "") {
        return true;
      } else {
        return (
          product.categorias &&
          product.categorias.some((categoria) =>
          filtrosSeleccionados.includes(categoria.titulo)
          )
        );
      }
    });
    setFilteredProducts(listaFiltrada);
  }, [filtrosSeleccionados, listaAleatoria]);

  const renderCategoryOptions = () => {
    const categorias = listaCategorias;
    return categorias.map((category, index) => (
      <div
        key={index}
        className={`category-square  ${filtrosSeleccionados.includes(category.titulo) ? "selected" : ""
          }`}
      >
        <img
          src={category.imagen}
          alt={category.titulo}
          onClick={() => guardarFiltros(category.titulo)}
        />
        <label className='asdasd' value={category.titulo}>{category.titulo}</label>
      </div>
    ));
  };
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [librosFiltrados, seLibrosFiltrados] = useState("");

  const obtenerDatos = (inicio, fin) => {
    setFechaInicio(inicio);
    setFechaFin(fin);
    setLibrosReservados([]);
  };

  const obtenerDatosFilt = (librosFiltrados) => {
    seLibrosFiltrados(librosFiltrados)
    //console.log("Search", librosFiltrados);
  }

  useEffect(() => {
    setLibrosDisponibles(listaLibros);
  }, [listaLibros]);

  useEffect(() => {
    const listaRentBook= rentBook
    if (!listaRentBook.length == 0 && fechaInicio!=="") {
      listaRentBook.map((renta) => {
        const returnDate = new Date(renta.returnDate.split("T")[0]);
        const startDate = new Date(renta.startDate.split("T")[0]);
        const fechaInicio2 = new Date(fechaInicio);
        const fechaFin2 = new Date(fechaFin);
        fechaInicio2.setDate(fechaInicio2.getDate() + 1);
        fechaFin2.setDate(fechaFin2.getDate() + 1);
        if (
          new Date(fechaInicio2) < startDate &&
          new Date(fechaFin2) < startDate
          ) {
        } else if (new Date(fechaInicio2) > returnDate) {
        } else {
          setLibrosReservados((prevLista) => [...prevLista, renta.book.id]);
        }
      });
    }
  }, [listaLibros, fechaInicio, fechaFin]);

  return (
    <div>
      <Recomendados libros={listaLibros}></Recomendados>
      {
        isLoadingRent? <div className="loader-container"><div className="custom-loader loader-rent"></div></div>: <Buscador obtenerDatos={obtenerDatos} obtenerDatosFilt={obtenerDatosFilt} listaLibros={listaLibros} ></Buscador>
      }
      <div className="search-container">
        <div className="input-select">
          <div className="columnCategorias">
            <div className="category-title-button">
              <h2 className="category-title">Categorias</h2><button
                className="clearCategorybtn"
                onClick={() => {
                  guardarFiltros("");
                }}
              >
                X
              </button>
            </div>
            <div className="category-select">{renderCategoryOptions()}</div>
            <div>
              
            </div>
          </div>
        </div>
        {<h1></h1>}

        <LibrosPaginados
          totalLibros={listaLibros.length}
          libros={filteredProducts}
          isLoading={isLoading}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          librosReservados={librosReservados}
          librosFiltrados={librosFiltrados}
          librosDisponibles={librosDisponibles}
        ></LibrosPaginados>
      </div>
    </div>
  );
};
export default Search;
