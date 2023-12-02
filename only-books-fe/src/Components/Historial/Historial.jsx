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
    <div className="historial">
      <h1 className="titleHistorial">Mi historial de reservas: </h1>
      <div className="listadoGeneralH">
        {reservas.length !== 0 ? (
          <ul className="listadoUl">
            <div className="titulosHistorial">
              <p className="titleReserva">Titulo:</p>
              <div className="fechasHistorialTitulos">
                <p className="tituloFechaH">Fecha de inicio:</p>
                <p className="tituloFechaF">Fecha de finalizacion:</p>
              </div>
            </div>

            {reservas.map((reserva) => (
              <li className="listadoHistorial" key={reserva.id}>
                <div className="tituloImgHistorial">
                  <img
                    className="imgHistorial"
                    src={reserva.book.imgUrl}
                    alt={reserva.book.title}
                  ></img>
                  <p className="titleReservaHistorial"> {reserva.book.title}</p>
                </div>
                <div className="fechasHistorial">
                  <p className="fechaInicio">{reserva.startDate.split("T")[0]}</p>
                  <p className="fechaFin">
                    {reserva.returnDate.split("T")[0]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encuentran reservas</p>
        )}
      </div>
    </div>
  );
};

export default Historial;