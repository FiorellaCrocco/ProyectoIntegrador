import React, { useEffect, useState } from "react";
//import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart as farHeart,faHeart as fasHeart,} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { useAccount } from "../../Context/accountContext";
import { GlobalContext } from "../../Context/globalContext";
const Favoritos = (props) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [favorito, setFavorito] = useState(props.isFavorite);
  const { userData } = useAccount();
  const {actualizarListaFav} = props

  const bookId = props.variable;
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;


  const fetchDataAgregar = async () => {
    try {
      const url = `${API_URL}user/${userId}/agregarFav/${bookId}`;
      const set = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, set);
      if (response.ok) {
        console.log("se mando ok");
        setFavorito(true);
      }
      if (!response.ok) {
        throw new Error("Error al realizar la operación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataEliminar = async () => {
    try {
      const url = `${API_URL}user/${userId}/eliminarFav/${bookId}`;
      const set = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, set);
      if (response.ok) {
        console.log("se borro ok");
        setFavorito(false);
      }
      if (!response.ok) {
        throw new Error("Error al realizar la operación");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleToggleFavorito = async () => {
    if (userData) {
      favorito ? await fetchDataEliminar() : await fetchDataAgregar();
      await actualizarListaFav()
      
    } else {
      window.location.href = "/login";
    }
  };


  return (
    <FontAwesomeIcon
      icon={favorito ? solidHeart : farHeart}
      onClick={handleToggleFavorito}
      style={{ cursor: "pointer", color: favorito? "red" : "gray" }}
    />
  );
};

export default Favoritos;