import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img src="/vite.svg" alt="Logo" />
                        {/* <img src="src\img\logoOnlyBooksv1.jpeg" alt="Logo" /> */}
                    </Link>

                    <div className="lema">
                        <span >Historias que alquilas,</span>
                        <span >emociones que compartís</span>
                    </div>

                </div>
                <div className="header-right">
                    <button onClick={toggleMenu}>Crear cuenta</button>
                    <button onClick={toggleMenu}>Iniciar sesión</button>
                </div>
            </div>
        </header>
    );
};
export default Navbar;