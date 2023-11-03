/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Administrador from './Routes/Administrador';
import CargarProducto from './Components/CargarProducto/CargarProducto';
import Home from './Routes/Home';
import ListarProducto from './Components/ListarProducto/ListarProducto';
import Detail from './Routes/Detail';
import Restricted from './Components/RestrictedPageResponsive/Restricted';
import LoginPage from './Components/LogIn/LoginPage';
import RegisterPage from './Components/LogIn/RegisterPage'

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path='/' Component={Home} />
          {isMobile ? (
            <Route
              path="/administrador"
              element={<Restricted/>}
            />
          ) : (
            <Route path="/administrador" element={<Administrador />} />
          )}
          <Route path='/detail/:id' Component={Detail} />
          <Route path='/registrarse' Component={RegisterPage}/>
          <Route path='/login' Component={LoginPage}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App