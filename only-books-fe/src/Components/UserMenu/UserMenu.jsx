import React, { useState, useContext } from 'react';
import Avatar from '../Avatar/Avatar';
import { GlobalContext } from "../../Context/globalContext";
import { useAccount } from "../../Context/accountContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import './UserMenu.css';

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useContext(GlobalContext);
    const { userData, clearUserData } = useAccount();
    const navigate = useNavigate();
    const name = userData && userData.name ? userData.name + ' ' + userData.lastname : "Usuario Desconocido";


    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const onLogout = () => {
        logout();
        clearUserData();
        navigate('/', {
            replace: true,
        });
    };

    return (
        <div className="user-menu">
            <div className="avatar-container" onClick={toggleMenu}>
            
                <Avatar name={name} />
            </div>
            {showMenu && (
                <div className="custom-dropdown">
                    <Link to="/" className="custom-dropdown-item">Mi perfil</Link>
                    <Link to="/" className="custom-dropdown-item">Mis Reservas</Link>
                    <div className="custom-dropdown-item  custom-logout" onClick={onLogout}>Cerrar sesión</div>
                    {/* Agrega otros elementos personalizables aquí */}
                </div>
            )}
        </div>
    );
};

export default UserMenu;
