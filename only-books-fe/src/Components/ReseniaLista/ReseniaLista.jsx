import { useEffect, useState } from "react";

function ReseniaLista({ id }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");
  const bookId = id;

  const [listaResenias, setListaResenias] = useState([]);

  const fetchObtenerResenias = async () => {
    const url = `${API_URL}resenia/book/${bookId}`;
    console.log("FETCH GET RESENIA")

    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      
      setListaResenias(data);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchObtenerResenias();
  }, []);

  const renderResenias=(listaResenias)=>{
    return listaResenias.map(resenia=>(
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
      {renderResenias(listaResenias)}
    </section>
  );
}
export default ReseniaLista;
