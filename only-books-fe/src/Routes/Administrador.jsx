import React from 'react'
import './Administrador.css'
import { Link } from 'react-router-dom';


const Administrador = () => {
  return (
    <>
  <h1 className='bienvenida'>BIENVENIDO AL PANEL DE ADMINISTRACION</h1>
  <h2 className='subtit'>Que deseas hacer?</h2>
  <div className='panel'> 
    <button className='adminBtn'><Link to="/administrador/cargar" className='hipervinc'>Cargar nuevo producto</Link></button>
    <button className='adminBtn'><Link to="/administrador/listar" className='hipervinc'>Listar productos</Link></button>
    <button className='adminBtn'>Editar productos</button>

  </div>
      
    </>
  )
}

export default Administrador