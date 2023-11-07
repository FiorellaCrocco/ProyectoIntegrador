/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './Administrador.css'
import AdminImg from '../img/admin.png'
import { Button } from "@mui/material";
import ListarProducto from '../Components/ListarProducto/ListarProducto';
import AgregarCategoria from '../components/AgregarCategoria/AgregarCategoria';
import CargarProducto from '../Components/CargarProducto/CargarProducto';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ListarCategoria from '../Components/ListarCategoria/ListarCategoria';
import AdministrarCaracteristicas from '../Components/AdministrarCaracteristicas/AdministrarCaracteristicas';
import ListarUsuarios from '../Components/ListarUsuarios/ListarUsuarios'


const Administrador = () => {



  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };


  return (
    <div className="panel">
      <div className="admin-panel">
        <div className="buttons-container">
          <div className='welcome-admin'>
            <img className='admin-img' src={AdminImg} alt="" />
            <div>
              {/* <h1>Administración</h1> */}
              <h1>Bienvenido</h1>
              {/* <h2>{username}</h2> */}
            </div>
          </div>
          <Button onClick={() => handleOpen(<CargarProducto />)}>
            <div className="add-product">
              <h3>Registrar Producto {<ArrowRightOutlinedIcon fontSize="large" />}</h3>

            </div>
          </Button>
          <Button onClick={() => handleOpen(<ListarProducto />)}>
            <div className="add-category">
              <h3>Listar Productos {<ArrowRightOutlinedIcon fontSize="large" />}</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<AgregarCategoria />)}>
            <div className="add-category">
              <h3>Agregar Categoría {<ArrowRightOutlinedIcon fontSize="large" />}</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<ListarCategoria/>)}>
            <div className="add-category">
              <h3>Listar Categorias {<ArrowRightOutlinedIcon fontSize="large" />}</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<AdministrarCaracteristicas/>)}>
            <div className="add-feature">
              <h3>Administrar Características {<ArrowRightOutlinedIcon fontSize="large" />}</h3>
            </div>
          </Button>
          <Button onClick={() => handleOpen(<ListarUsuarios/>)}>
            <div className="add-feature">
              <h3>Listar Usuarios {<ArrowRightOutlinedIcon fontSize="large" />}</h3>
            </div>
          </Button>
        </div>
        <div className="selected-item">
          {selectedItem}
        </div>
      </div>
    </div>
  )
}

export default Administrador;