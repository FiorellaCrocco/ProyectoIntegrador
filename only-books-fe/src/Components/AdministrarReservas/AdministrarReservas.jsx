import React, { useEffect,useLayoutEffect, useState } from "react";
import "./AdministrarReservas.css";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

function AdministrarReservas() {
  const [listaReservas, setListaReservas] = useState([]);
  const [actualizar, setActualizar] = useState(false);
  const [scroll, setScroll] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  async function eliminarReserva(id) {
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro de que deseas eliminar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (confirmacion.isConfirmed) {
      const url = `${API_URL}bookRent/eliminar/${id}`;
      const token = sessionStorage.getItem("token");
      const settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, settings);

        if (response.status === 200) {
          console.log("Se eliminó la reserva correctamente");
          // Actualizar la lista de características eliminando la característica
          await Swal.fire({
            text: "Reserva eliminada con éxito",
            icon: "success",
            showConfirmButton:true,
          });
          actualizar == true ? setActualizar(false) : setActualizar(true);
        } else {
          console.error("Error al eliminar la reserva");
          // Mostrar mensaje de error
          await Swal.fire({
            text: "Error al eliminar la reserva",
            icon: "error",
            showConfirmButton: true
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    }
  }

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

  useEffect(() => {
    Swal.fire({
      title: "Actualizando lista",
      icon: "info",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const token = sessionStorage.getItem("token");
  
          const url = `${API_URL}bookRent/listar`;
          const settings = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await fetch(url, settings);
          const data = await response.json();
          if (response.ok) {
            const listaOrdenada = ordenarLibros(data);
  
            console.log("Lista de reservas:", listaOrdenada);
            setListaReservas(listaOrdenada);
            return data;
          } else {
            throw new Error("Error al realizar la operación");
          }
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
    .then((result) => {
      console.log("Operación completada:", result);
    })
    .catch((error) => {
      console.error("Error en la operación:", error);
    })
    .finally(() => {
      setTimeout(()=>{
        setScroll(!scroll);
        window.scrollTo(0, 0);
      },300)
    });
  }, [actualizar]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [scroll]);

  return (
    <div>
      <h2 className="tituloListCar">Listado de Reservas</h2>
      <ul className="elementsCaract">
        {listaReservas.map((reserva) => (
          <li className="listId" key={reserva.id}>
            <div className="listaTitle">{reserva.book.title}</div>
            <div className="listaTitle">
              {reserva.user.name} {reserva.user.lastname}
            </div>
            <div className="listaTitle">{reserva.startDate.split("T")[0]}</div>
            <div className="listaTitle">{reserva.returnDate.split("T")[0]}</div>
            <div className="admin-btn-container">
              <Button
                variant="outlined"
                color="error"
                className="btnDeleteCaracteristica"
                onClick={() => eliminarReserva(reserva.id)}
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AdministrarReservas;
