import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import Favoritos from "../Favoritos/Favoritos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const Card = ({
  id,
  imgUrl,
  title,
  price,
  qualification,
  cantResenias,
  isFavorite,
  actualizarListaFav,
}) => (
  <div className="body-cards">
    <div className="card">
      <div className="card-info">
      <FontAwesomeIcon icon={faStarSolid} className="card-star" />
        {qualification}({cantResenias})
      </div>
      <div className="card-img">
        <Link to={`/detail/${id}`}>
          <img src={imgUrl} alt={title} />
        </Link>
      </div>
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-details">
        <div className="price">
          <span>Precio</span>
          <p>${price}</p>
        </div>
      </div>
      <div className="buttonFavContainer">
        <button className="buttonComprar">Alquilar</button>
        <div className="FavCardCorazon">
          <Favoritos
            variable={id}
            isFavorite={isFavorite}
            actualizarListaFav={actualizarListaFav}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Card;
