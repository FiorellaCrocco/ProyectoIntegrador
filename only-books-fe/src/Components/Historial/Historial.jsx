import React, { useEffect, useState } from 'react';
import './Historial.css';

const Historial = () => {
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;
  const API_URL = import.meta.env.VITE_API_URL
  const url = `${API_URL}bookRent/user/${userId}`;
  const token = sessionStorage.getItem("token");
  const [reservas, setReservas] = useState([])

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerReservas = async () => {
    try {
      const response = await fetch(url, settings);
      console.log("Obteniendo respuesta")
      const listaReservas = await response.json();
      console.log("VerificarUsuario")
      console.log(listaReservas)


      return listaReservas;

    } catch (error) {
      console.error("ERROR: ", error)
    }

  }


  useEffect(() => {
    const fetchData = async () => {
      const listaReservas = await obtenerReservas();
      setReservas(listaReservas);
      console.log(listaReservas);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Mi historial de reservas</h1>
      {reservas.length !== 0 ? (
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <p>{reserva.book.title}</p>
              <p>{reserva.startDate.split("T")[0]}</p>
              <p>{reserva.returnDate.split("T")[0]}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encuentran reservas</p>
      )}
    </div>
  );
};

export default Historial;