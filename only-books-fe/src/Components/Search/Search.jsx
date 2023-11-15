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
    fetchFiltroRent,
    rentBook,
    fetchData,
  } = useContext(GlobalContext);
  const [listaAleatoria, setListaAleatoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [listaRentBook, setListaRentBook] = useState([]);
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
      <div
        key={index}
        className={`category-square  ${selectedCategory.includes(category.titulo) ? "selected" : ""
          }`}
      >
        <img
          src={category.imagen}
          alt={category.titulo}
          onClick={() => handleCategoryChange(category.titulo)}
        />
        <label value={category.titulo}>{category.titulo}</label>
      </div>
    ));
  };
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const obtenerDatos = (inicio, fin) => {
    setFechaInicio(inicio);
    setFechaFin(fin);
    setLibrosReservados([]);
  };

  useEffect(() => {
    setLibrosDisponibles(listaLibros);
  }, [listaLibros]);

  useEffect(() => {
    const data = rentBook;
    setListaRentBook(data);
    console.log(listaRentBook);
    if (!listaRentBook.length == 0) {
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
          console.log("Renta valida, previa a la reserva existente");
        } else if (new Date(fechaInicio2) > returnDate) {
          console.log("Renta valida, posterior a la reserva existente.");
        } else {
          console.log(renta.book.id);
          setLibrosReservados((prevLista) => [...prevLista, renta.book.id]);
        }
      });
    }
  }, [listaLibros, fechaInicio, fechaFin]);

  return (
    <div>
      <Recomendados libros={listaLibros}></Recomendados>
      <Buscador obtenerDatos={obtenerDatos} listaLibros={listaLibros}></Buscador>
      <div className="search-container">
        <div className="input-select">
          <div>
            <div>
              <h2 className="category-title">Categorias</h2>
            </div>
            <div className="category-select">{renderCategoryOptions()}</div>
            <div>
              <button
                className="clearCategorybtn"
                onClick={() => {
                  setSelectedCategory([]);
                }}
              >
                X
              </button>
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
        ></LibrosPaginados>
      </div>
    </div>
  );
};
export default Search;
