import './Subnavbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from '../../Context/accountContext'

const Subnavbar = () => {
    const { isAuthenticated, isAdmin } = useAccount();

    return (
        <div className="subnavbar">
            <Link to="/">Inicio</Link>
            <Link to="/suscripciones">Subscripciones</Link>

            {isAuthenticated ? (
                <Link to="/favoritos">Mis favoritos</Link>
            ) : (
                <Link to="/login">Mis favoritos</Link>
            )}

            {isAuthenticated ? (
                <Link to="/historial">Mi Historial</Link>
            ) : null}

            {isAdmin ? (
                <Link to="/administrador">Administrador</Link>
            ) : null}
        </div>
    );
};

export default Subnavbar;
