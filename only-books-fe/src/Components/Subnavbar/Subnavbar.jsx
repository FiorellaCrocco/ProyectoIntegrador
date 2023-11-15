import './Subnavbar.css';
import React from 'react';
import { Link } from 'react-router-dom';


const Subnavbar = () => {

    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const isAdmin = userData?.rol === 'ADMIN';

    return (
        <div className="subnavbar">
            <Link to="/">Inicio</Link>
            <Link to="/suscripciones">Subscripciones</Link>
            <Link to="/reservas">Mis reservas</Link>
            <Link to="/favoritos">Mis favoritos</Link>
            
            {isAdmin ? (
                <Link to="/administrador">Administrador</Link>
            ) : null 
            }
        </div>
    );
};

export default Subnavbar;
