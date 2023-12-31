import React, { useEffect } from 'react';
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
import Historial from './Components/Historial/Historial';
import Subnavbar from "./Components/Subnavbar/Subnavbar";


import Reserva from './Components/Reserva/Reserva'
import WhatsApp from './Components/WhatsApp/WhatsApp';
import { useAccount } from './Context/accountContext';




function App() {
  const token = sessionStorage.getItem("token");
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  
  const userDataString = sessionStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const { isAdmin } = useAccount();

  useEffect(()=>{
    console.log("isAdmin: ", isAdmin);
  },[isAdmin])

  return (
    <div className="app">
      <Navbar />
      <Subnavbar className="subResponsive" />
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
          {/* <Route path='/loginReserva'element={<LoginPage msg="Es necesario iniciar sesion para reservar un libro"></LoginPage>}></Route> */}
          <Route path= '/favoritos' Component={ListaFavoritos}/>
          <Route path= '/historial' Component={Historial}/>
          <Route path= '/reservar' Component={Reserva}/> 
        </Routes>

      </div>
      <WhatsApp></WhatsApp>
      <Footer />
    </div>
  )
}

export default App


