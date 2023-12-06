import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Card.css";
import Favoritos from "../Favoritos/Favoritos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment as faCommentSolid} from "@fortawesome/free-solid-svg-icons"




function Card({
  id,
  imgUrl,
  title,
  price,
  qualification,
  cantResenias,
  isFavorite,
  actualizarListaFav,
  fechaInicio,
  fechaFin,
}) {
  const navigate = useNavigate();

  const handleClick=()=>{
    navigate(`/detail/${id}`,{state:{
      inicio: fechaInicio,
      fin: fechaFin

    }})
  }
  const handleFavClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="body-cards" >
      <div className="card" onClick={handleClick}>
        <div className="card-img">
          {/* <Link to={`/detail/${id}`}> */}
            <img src={imgUrl} alt={title} />
          {/* </Link> */}
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
          {/* <button className="buttonComprar">Alquilar</button> */}
          <div className="card-info">
          <FontAwesomeIcon icon={faStarSolid} className="card-star" />
          <span>{qualification}/5</span>
          <FontAwesomeIcon icon={faCommentSolid} className="card-comment"/>
          <span>{cantResenias}</span>
        </div>
          <div className="FavCardCorazon" id="favIcon" onClick={handleFavClick}>
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
}
export default Card;
