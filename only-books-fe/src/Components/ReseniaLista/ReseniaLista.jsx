import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/globalContext";
import style from "./ReseniaLista.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

function ReseniaLista({ id }) {
  // console.log("Reenderizando ReseniaLista")
  const bookId = id;

  const { fetchObtenerResenias, listaResenias } = useContext(GlobalContext);

  useEffect(() => {
    fetchObtenerResenias(bookId);
  }, [bookId]);

  const renderResenias = (listaMap) => {
    
    return listaMap.map((resenia) =>{
      if(resenia.fechaResenia!==null){

      
     return (
      
      <li key={resenia.id}>
        <div>
          <h3>
            {resenia.user.name} {resenia.user.lastname}
          </h3>
          <div>
            <span>{resenia.puntuacion}</span>
            <FontAwesomeIcon icon={faStarSolid} className={style.starIcon} />
          </div>
        </div>
        <p>{resenia.comentario}</p>
        <p>{resenia.fechaResenia.split("T")[0]}</p>
      </li>
    )}else{
      return null
    }});
  };

  return (
    <section className={style.listaReseniaSection}>
      <h2>Lista de reseñas:</h2>
      <ul className={style.listaResenias}>
        {listaResenias.length > 0 ? (
          renderResenias(listaResenias)
        ) : (
          <p>No hay reseñas disponibles</p>
        )}
      </ul>
    </section>
  );
}
export default ReseniaLista;
