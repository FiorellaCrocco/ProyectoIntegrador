import React, { useState, useContext, useRef, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import { GlobalContext } from "../../Context/globalContext";
import { useAccount } from "../../Context/accountContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Perfil from '../MiPerfil/Perfil'
import './UserMenu.css';

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useContext(GlobalContext);
    const { userData, clearUserData } = useAccount();
    const navigate = useNavigate();
    const name = userData && userData.name ? userData.name + ' ' + userData.lastname : "Usuario Desconocido";
    const menuRef = useRef(null);

    
    const toggleMenu = () => {
        setShowMenu(prevState => !prevState);
    };

    const onLogout = () => {
        logout();
        clearUserData();
        navigate('/', {
            replace: true,
        });
        window.location.reload()
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };
    
    const handleAvatarClick = (event) => {
        toggleMenu();
        event.stopPropagation();
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-menu avatar-container-open">
            <div className="avatar-container " onClick={handleAvatarClick}>
            
                <Avatar name={name} />
            </div>
            {showMenu && (
                <div className="custom-dropdown" ref={menuRef}>
                    <Link to="/perfil" className="custom-dropdown-item">Mi perfil</Link>
                    <Link to="/historial" className="custom-dropdown-item">Mis Reservas</Link>
                    <div className="custom-dropdown-item  custom-logout" onClick={onLogout}>Cerrar sesión</div>
                    
                </div>
            )}
        </div>
    );
};

export default UserMenu;
