import React, { useState, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Avatar from '../Avatar/Avatar';
import { GlobalContext } from "../../Context/globalContext";
import { useAccount } from "../../Context/accountContext";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const UserMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { logout } = useContext(GlobalContext);
    const { userData, clearUserData } = useAccount();
    const navigate = useNavigate();

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
                <Avatar name="Nombre Apellido" />
            </div>
            <Dropdown show={showMenu}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Menú
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={onLogout}>Cerrar sesión</Dropdown.Item>
                    {/* Agrega otros elementos personalizables aquí */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default UserMenu;
