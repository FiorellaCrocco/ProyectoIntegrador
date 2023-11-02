/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";



const Navbar = () => {

    const { state } = useLocation();
    const navigate = useNavigate();

    console.log(state);

    const onLogout = () => {
        navigate('/', {
            replace: true,
        });
    };



    return (
        <header className="navbar">
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img className="logo"
                            src="https://onlybooksbucket.s3.amazonaws.com/Productos/logoOnlyBooksv2+(2).png"
                            alt="Logo" />
                    </Link>
                    <Link to="/">
                        <div className="lema">
                            {/* <span >Historias que alquilas, emociones que compartís</span> */}
                            <span >Historias que alquilas,</span>
                            <span >emociones que compartís</span>
                        </div>
                    </Link>
                </div>

                {state?.logged ? (
                    <div className='user'>
                        <span className='username'>{state?.name}</span>
                        <button className='btn-logout' onClick={onLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                ) : (
                    <div className="header-right">
                        <Link to='/registrarse'><button className="btn-create" >Crear cuenta</button></Link>
                        <Link to='/login'> <button className="btn-login">Iniciar sesión</button></Link>
                    </div>
                )}



            </div>
        </header>
    );
};
export default Navbar;