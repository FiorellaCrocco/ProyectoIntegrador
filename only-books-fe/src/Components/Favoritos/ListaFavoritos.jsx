import React, { useEffect, useState } from "react";
import Favoritos from "./Favoritos";
import { useAccount } from "../../Context/accountContext";
import { GlobalContext } from "../../Context/globalContext";
import Card from "../Card/Card";
import './ListaFavoritos.css'

const ListaFavoritos = () => {
  const { userData } = useAccount();
  const API_URL = import.meta.env.VITE_API_URL;
  const [librosFavoritos, setLibrosFavoritos] = useState([]);


  useEffect(() => {
    // Llamar a la función para obtener y establecer la lista de libros favoritos
    fetchDataMostrar();
  }, [userData]); // Se ejecutará cada vez que userData cambie

  const fetchDataMostrar = async () => {
    try {
      if (userData) {
        const userId = userData.id;
        const token = sessionStorage.getItem("token");

        const url = `${API_URL}user/mostrarFav/${userId}`;
        const set = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, set);
        const data = await response.json();

        if (response.ok) {
          console.log("Lista de libros favoritos:", data);
          // Actualizar el estado con la lista de libros favoritos
          setLibrosFavoritos(data);
        } else {
          throw new Error("Error al realizar la operación");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
    
  const actualizarListaFav = () => {
    fetchDataMostrar();
  };
  
  const renderList = () => {
  return (
    <div className="listado">
      <h2 className="h2">Tus Libros Favoritos:</h2>
      {
        librosFavoritos.length==0?<p>No tienes libros como favorito</p>:
        <ul className="cardFavs">
        {librosFavoritos.map((bookId) => (
          <li key={bookId.id}>
            <Card
              key={bookId.id}
              {...bookId}
              isFavorite={true}
              actualizarListaFav={actualizarListaFav}
            />
          </li>
        ))}
      </ul>
      }
      
    </div>
  );
  }
  
            useEffect(() => {
              renderList();
            }, [librosFavoritos]);
  


  return (
    /*<div className="listado">
      <h2>Tus Libros Favoritos:</h2>
      <ul className="cardFavs">
        {librosFavoritos.map((bookId) => (
          <li key={bookId.id}>
            <Card key={bookId.id} {...bookId} isFavorite={true} />
          </li>
        ))}
      </ul>
    </div>*/
    <div className="render">{renderList()}</div>
  );
};

export default ListaFavoritos;