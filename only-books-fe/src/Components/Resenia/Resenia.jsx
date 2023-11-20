import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import style from "./Resenia.module.css";
import { GlobalContext } from "../../Context/globalContext";
import { useState, useContext } from "react";

function Resenia({ id }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("userData"));

  const userId = user ? user.id : null;
  const bookId = id;

  const { fetchObtenerResenias } = useContext(GlobalContext);

  const [estrella, setEstrella] = useState(0);
  const estrellas = [1, 2, 3, 4, 5];

  const [formData, setFormData] = useState({
    user: {
      id: userId,
    },
    book: {
      id: bookId,
    },
    comentario: "",
    puntuacion: 0,
    fechaResenia: "",
  });
  const handleEstrella = (star) => {
    setEstrella(star);
    setFormData({
      ...formData,
      puntuacion: star,
    });
  };

  const renderEstrellas = (estrellas) => {
    return estrellas.map((star) => (
      <li key={star} onClick={() => handleEstrella(star)}>
        <FontAwesomeIcon
          icon={star <= estrella ? faStarSolid : faStar}
          className={style.starIcon}
        />
      </li>
    ));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fecha = new Date(Date.now());
    const fechaFormat = fecha.toISOString();
    setFormData({
      ...formData,
      [name]: value,
      fechaResenia: fechaFormat,
    });
  };

  const fetchEnviarResenia = async () => {

    const url = `${API_URL}resenia/agregar`;
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(url, settings);
      const data = await response.text();
      console.log("Se creo la reseña con id: " + data);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const verificarUsuario = async() => {
    const url = `${API_URL}bookRent/user/${userId}`;
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, settings);
      console.log("Obteniendo respuesta")
      const listaReservas = await response.json();
      console.log("VerificarUsuario")
      console.log(listaReservas)

      const lista = listaReservas.map((reserva)=>{
        if(reserva.book.id == bookId)
        return true
      })
      const tieneReserva = lista.some(booleanos => booleanos ===true)
      console.log("Dentro verificar Usuario")
      console.log(tieneReserva)
      return tieneReserva

    }catch(error){
      console.error("ERROR: ", error)
    }
    

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      comentario: "",
      puntuacion: 0,
    });
    setEstrella(0);

    const resultado = await verificarUsuario();
    console.log("HANDLE SUBMIT")
    console.log(resultado)
    if(resultado){
      await fetchEnviarResenia();
      await fetchObtenerResenias(bookId);
    }else{
      console.log("No puedes hacer una resenia para este libro")
    }
    console.log(formData);
  };

  return (
    <section>
      <h2>Reseña del libro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comentario">Comentario:</label>
        <textarea
          id="comentario"
          name="comentario"
          value={formData.comentario}
          cols={50}
          rows={4}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="valoracion">Valoracion:</label>
        <div>
          <ul className={style.listaStars}>{renderEstrellas(estrellas)}</ul>
        </div>
        <button>Enviar Reseña</button>
      </form>
    </section>
  );
}
export default Resenia;
