import React, { useEffect, useState } from 'react';
import { addDays} from 'date-fns';
import './Historial.css';
import Swal from "sweetalert2";

const Historial = () => {
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;
  const API_URL = import.meta.env.VITE_API_URL
  const url = `${API_URL}bookRent/user/${userId}`;
  const token = sessionStorage.getItem("token");
  const [reservas, setReservas] = useState([])
  const [mensaje, setMensaje] = useState("")

  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const obtenerReservas = async () => {
    try {
      Swal.fire({
        title: "Buscando reservas...",
        icon: "info",
        showConfirmButton:false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
      });
      const response = await fetch(url, settings);
      console.log("Obteniendo respuesta")
      const listaReservas = await response.json();
      const reservasOrdenadas= ordenarLibros(listaReservas)
      console.log("VerificarUsuario")
      console.log(listaReservas)
      if(listaReservas.length==0){
        setMensaje("No se encuentran reservas")
      }
      Swal.close();


      return reservasOrdenadas;

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
  const ordenarLibros = (reservas) => {
    reservas.sort((a, b) => {
      const titleA = a.book.title.toUpperCase();
      const titleB = b.book.title.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return reservas;
  };

  function formatDate(date) {
    return date.toLocaleDateString("es-ES"); // Puedes ajustar el idioma según tu preferencia
  }
  

  return (
    <div className='rootRes'>
    <div className="historial">
      <h1 className="titleHistorial">Mi historial de reservas: </h1>
      <div className="listadoGeneralH">
        {reservas.length !== 0 ? (
          <ul className="listadoUl">
            <div className="titulosHistorial">
              <p className="titleReserva">TITULO</p>
              {/* <div className="fechasHistorialTitulos"> */}
                <p className="tituloFechaH">FECHA DE INICIO</p>
                <p className="tituloFechaF">FECHA DE FINALIZACION</p>
              {/* </div> */}
            </div>
          <div className='contenedorAlt'>
            {reservas.map((reserva) => (
              <li className="listadoHistorial " key={reserva.id}>
                <div className="tituloImgHistorial">
                  <img
                    className="imgHistorial"
                    src={reserva.book.imgUrl}
                    alt={reserva.book.title}
                  ></img>
                  <p className="titleReservaHistorial"> {reserva.book.title}</p>
                </div>
                {/* <div className="fechasHistorial"> */}
                  <p className="fechaInicio">{formatDate(addDays(new Date(reserva.startDate.split("T")[0]), 0))}</p>
                  <p className="fechaFin">
                    {formatDate(addDays(new Date(reserva.returnDate.split("T")[0]), 0))}
                  </p>
                {/* </div> */}
              </li>
            ))}
            </div>
          </ul>
        ) : (
          <p>{mensaje}</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Historial;