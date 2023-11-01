/* eslint-disable no-unused-vars */
import React from 'react'
import './Administrador.css'
import { Link } from 'react-router-dom';


const Administrador = () => {
  return (
    <div className='admin-panel'>
      <h1 className='bienvenida'>Panel de Administracion</h1>
      <h2 className='subtit'>Que deseas hacer?</h2>
      <div className='panel'>
        <Link to="/administrador/cargar" className='hipervinc'> <button className='adminBtn'>Cargar nuevo producto</button> </Link>
        <Link to="/administrador/listar" className='hipervinc'> <button className='adminBtn'>Listar productos</button> </Link>
        <button className='adminBtn'>Editar productos</button>
      </div>
    </div>
  )
}

export default Administrador