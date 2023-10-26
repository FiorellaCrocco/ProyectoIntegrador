/* eslint-disable no-unused-vars */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Administrador from './Routes/Administrador';
import CargarProducto from './Components/Administrador/CargarProducto';
import Home from './Routes/Home';
import ListarProducto from './Components/Administrador/ListarProducto';
import Detail from './Routes/Detail';
import Restricted from './Routes/Restricted';

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
          <Route path='/administrador/cargar' Component={CargarProducto} />
          <Route path='/administrador/listar' Component={ListarProducto} />
          <Route path='/detail/:id' Component={Detail} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App