import { useState } from "react";
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
                        {/* <img src="/vite.svg" alt="Logo" /> */}
                        <img  className="logo"
                        src="https://onlybooksbucket.s3.amazonaws.com/Productos/logoOnlyBooksv2+(2).png" alt="Logo" />

                    </Link>
                    <Link  to="/">
                        <div className="lema">
                            {/* <span >Historias que alquilas, emociones que compartís</span> */}
                            <span >Historias que alquilas,</span>
                            <span >emociones que compartís</span>
                        </div>
                    </Link>



                </div>
                <div className="header-right">
                    <button className="btn-create" onClick={toggleMenu}>Crear cuenta</button>
                    <button className="btn-login" onClick={toggleMenu}>Iniciar sesión</button>
                </div>
            </div>
        </header>
    );
};
export default Navbar;