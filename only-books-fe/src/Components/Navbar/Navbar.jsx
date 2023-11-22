/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAccount } from "../../Context/accountContext";
import UserMenu from '../UserMenu/UserMenu';
import Subnavbar from "../Subnavbar/Subnavbar";

const Navbar = () => {

    const { userData} = useAccount()


    return (
        <header className="navbar" id="navbar">
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
                {/* <form className="search-box">
                    <input type="text" placeholder=" " />
                    <button type="reset"></button>
                </form> */}
                {userData ? (
                    <UserMenu />
                ) : (
                    <div className="header-right">
                        
                        <Link to='/registrarse'><button className="btn-create">Crear cuenta</button></Link>
                        <Link to='/login'> <button className="btn-login">Iniciar sesión</button></Link>
                    </div>
                )}
            </div>
            <Subnavbar className="subResponsive" />
        </header>
    );
};
export default Navbar;