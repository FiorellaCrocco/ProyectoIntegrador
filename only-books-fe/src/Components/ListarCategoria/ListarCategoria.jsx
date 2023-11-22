import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../Context/globalContext";
import Button from "@mui/material/Button";
import "./ListarCategoria.css";
import "../AdministrarCaracteristicas/AdministrarCaracteristicas.css";
import Swal from "sweetalert2";

const ListarCategoria = () => {
  const { listaCategorias, actualizarCategorias } = useContext(GlobalContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const [actualizar, setActualizar] = useState(false);

  async function eliminarCategoria(id) {
    const confirmacion = await Swal.fire({
      text: "¿Estás seguro de que deseas eliminar esta categoria?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    });

    if (confirmacion.isConfirmed) {
      const url = `${API_URL}categoria/eliminar/${id}`;
      const token = sessionStorage.getItem("token");
      const config = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, config);

        if (response.status === 200) {
          console.log("Se eliminó la categoria correctamente");
          actualizar == true ? setActualizar(false) : setActualizar(true);
          // Actualizar la lista de cartegorias eliminando la categoria
          Swal.fire({
            text: "Categoria eliminada con éxito",
            icon: "success",
          });
        } else {
          console.error("Error al eliminar categoria");
          // Mostrar mensaje de error
          Swal.fire({
            text: "Error al eliminar categoria",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    }
  }

  useEffect(() => {
    actualizarCategorias();
  }, [actualizar]);

  return (
    <div>
      <h2 className="tituloListCat">Listado de Categorías:</h2>
        <ul className="listaContCat">
          {listaCategorias.map((categoria) => (
            <li className="listId" key={categoria.id}>
              <div>{categoria.id}</div>
              <div className="textCat">{categoria.titulo}</div>
              <div className="btnContainer">
              <Button
                  variant="outlined"
                  color="error"
                  className="btnEditUserCat"
                  onClick={() => eliminarCategoria(categoria.id)}
                  >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default ListarCategoria;
