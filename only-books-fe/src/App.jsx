import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Administrador from './Routes/Administrador';
import Home from './Routes/Home';
import Detail from './Routes/Detail';
import Perfil from './Components/MiPerfil/Perfil';
import RestrictedMobile from './Components/RestrictedPageResponsive/RestrictedMobile';
import RestrictedNotAdmin from './Components/RestrictedPageResponsive/RestrictedNotAdmin'
import LoginPage from './Components/LogIn/LoginPage';
import RegisterPage from './Components/LogIn/RegisterPage'
import ListaFavoritos from './Components/Favoritos/ListaFavoritos';



function App() {
  const token = sessionStorage.getItem("token");
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  
  const userDataString = sessionStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const isAdmin = userData?.rol === 'ADMIN';

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path='/' Component={Home} />
          {isMobile ? (
            <Route path="/administrador" element={<RestrictedMobile />} />
          ) : (
            isAdmin ? (
              <Route path="/administrador" element={<Administrador />} />
            ) : <Route path="/administrador" element={<RestrictedNotAdmin />} />
          )}
          <Route path='/detail/:id' Component={Detail} />
          <Route path='/registrarse' Component={RegisterPage}/>
          <Route path='/perfil' Component={Perfil}/>
          <Route path='/login' Component={LoginPage}/>
          <Route path= '/favoritos' Component={ListaFavoritos}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App


