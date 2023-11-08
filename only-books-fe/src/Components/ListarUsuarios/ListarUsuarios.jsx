
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import Button from "@mui/material/Button";
import './ListarUsuarios.css';

const ListarUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const urlListar = `http://localhost:8080/user/listar`;
    //Para la  funcionalidad de EDITAR
    const [selectedUser, setSelectedUser] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
  
    const fetchDataList = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const settings = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
          console.log(token);
          const response = await fetch(urlListar, settings);
          if (!response.ok) {
            throw new Error("No se pudo obtener la lista de usuarios.");
          }
          setUsuarios(await response.json());
        } catch (error) {
          console.error("Error al cargar la lista de usuarios:", error);
        }
      };

    const handleEditOpen = (user) => {
      setSelectedUser(user);
      setEditOpen(true);
    };
  
    const handleEditClose = () => {
      setEditOpen(false);
    };
  
    useEffect(() => {
        fetchDataList();
    }, [])

  
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm(
        "¿Estás seguro de que deseas eliminar este usuario?"
      );
  
      if (confirmDelete) {
        const updatedUsuarios = usuarios.filter(
          (usuario) => usuario.id !== id
        );
        const settings = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const url = `http://localhost:8080/user/eliminar/${id}`;
        //  const url = `https://onlybooks.isanerd.club/api/user/eliminar/${id}`;
        // eslint-disable-next-line no-undef
        await fetchData(url, settings);
        setUsuarios(updatedUsuarios);
      }
    }

    return (
        <div className="listaProductosAdmin">
        <h2 className="tituloListaAdmin">Listado de usuarios</h2>
        <ul className="listaContainerAdmin">
          {usuarios.map((usuario) => (
            
            <li className="lista" key={usuario.id}>
              {console.log(usuario)}
              <div className="id">{usuario.id}</div>
              <div className="nombre">{usuario.email}</div>
              <div className="admin-btn-container">
                <Button
                  variant="outlined"
                  color="error"
                  className="btnEdit"
                  onClick={() => handleDelete(usuario.id)}
                >
                  Eliminar
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  className="btnEdit"
                  onClick={() => handleEditOpen(usuario)}
                >
                  Editar
                </Button>
              </div>
            </li>
          ))}
  
         {/*  <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
            <DialogContent>
              {selectedProduct && <EditarProducto product={selectedUser} onUpdateList={handleUpdateList} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog> */}
  
        </ul>
      </div>
    );
}

export default ListarUsuarios;