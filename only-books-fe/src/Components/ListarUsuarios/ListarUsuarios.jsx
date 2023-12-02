import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import "./ListarUsuarios.css";
import Swal from 'sweetalert2'

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const token = sessionStorage.getItem("token");
  const API_URL= import.meta.env.VITE_API_URL

  const urlListar = `${API_URL}user/listaexpress`;
//   const urlListar = "https://onlybooks.isanerd.club/api/user/listar";
   const urlModificar = `${API_URL}user/modificar`;
//  const urlModificar = "https://onlybooks.isanerd.club/api/user/modificar";

  const fetchDataList = async () => {
    try {
      const settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(urlListar, settings);

      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de usuarios.");
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar la lista de usuarios:", error);
    }
  };

  const fetchDataEditRole = async (user) => {
    try {
      // Cambiar el rol del usuario seleccionado
      user.rol = user.rol === "USER" ? "ADMIN" : "USER";

      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      };
      const response = await fetch(urlModificar, settings);
      if(response.ok){
        Swal.fire({
          text: "Rol cambiado con éxito!",
          icon: "success"
        });
      }
      if (!response.ok) {
        throw new Error("Error al modificar el rol del usuario.");
      }
    } catch (error) {
      console.error("Error al modificar el rol del usuario:", error);
    }
  };

  const handleEditRole = async (user) => {
    await fetchDataEditRole(user);
    fetchDataList();
  };

  const handleDelete = async (id) => {
    Swal.fire({
      text: "¿Estás seguro de que deseas eliminar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
          const settings = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const url = `${API_URL}user/eliminar/${id}`;
        //   const url = `https://onlybooks.isanerd.club/api/user/eliminar/${id}`;
          const response = await fetch(url, settings);
  
          if (!response.ok) {
            throw new Error("No se pudo eliminar el usuario.");
          }
  
          Swal.fire({
            text: "Usuario eliminado con éxito",
            icon: "success"
          });
  
          setUsuarios(updatedUsuarios);
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire({
            text: "Error al eliminar el usuario",
            icon: "error"
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  return (
    <div >
      <h2 className="tituloListaAdminUser">Listado de usuarios</h2>
      <ul className="listaContainerAdminUser">
        {usuarios.map((usuario) => (
          <li className="listaUser" key={usuario.id}>
            <div className="idUser">{usuario.id}</div>
            <div className="nombreUser">{usuario.email}</div>
            <div className="rolUser">{usuario.rol}</div>
            <div className="admin-btn-containerUser">
              <Button
                variant="outlined"
                color="error"
                className="btnEditUser"
                onClick={() => handleDelete(usuario.id)}
              >
                Eliminar
              </Button>
              <Button
                variant="outlined"
                color="success"
                className="btnEditUser"
                onClick={() => handleEditRole(usuario)}
              >
                Cambiar Rol
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarUsuarios;
