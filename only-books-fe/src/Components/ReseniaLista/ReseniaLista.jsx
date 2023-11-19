import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../Context/globalContext";

function ReseniaLista({ id }) {
    console.log("Reenderizando ReseniaLista")
  const bookId = id;

  const { fetchObtenerResenias, listaResenias } = useContext(GlobalContext);

  useEffect(() => {
    fetchObtenerResenias(bookId)
  }, [bookId]);

  const renderResenias=(listaMap)=>{
    return listaMap.map(resenia=>(
            <li key={resenia.id}>
                <h3>{resenia.user.name} {resenia.user.lastname}</h3>
                <span>{resenia.fechaResenia.split('T')[0]}</span>
                <p>{resenia.comentario}</p>
                <p>Calificacion: {resenia.puntuacion}</p>
            </li>
        ))
  }

  return (
    <section>
      <h2>Lista de reseñas:</h2>
      {listaResenias.length>0?renderResenias(listaResenias):<p>No hay reseñas disponibles</p>}
    </section>
  );
}
export default ReseniaLista;
