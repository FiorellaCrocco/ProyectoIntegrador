/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { GlobalContext } from "../../Context/globalContext";
import { useAccount } from "../../Context/accountContext";
// import Avatar from './Avatar';
import UserMenu from '../UserMenu/UserMenu';


const Navbar = () => {

    // const { logout } = useContext(GlobalContext);
    const { userData, isAuthenticated  } = useAccount();
    // const { state } = useLocation();
    // const navigate = useNavigate();


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
                <form className="search-box">
                    <input type="text" placeholder=" " />
                    <button type="reset"></button>
                </form>
                {console.log(userData)}
                {/* {isAuthenticated ? ( */}
                {userData ? (
                    
                    <UserMenu />
                    
                ) : (
                    <div className="header-right">
                        
                        <Link to='/registrarse'><button className="btn-create">Crear cuenta</button></Link>
                        <Link to='/login'> <button className="btn-login">Iniciar sesión</button></Link>
                    </div>
                )}
            
            </div>
        </header>
    );
};
export default Navbar;