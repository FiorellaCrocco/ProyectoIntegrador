// import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../Utils/routes.js'
import './Footer.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {


    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-left'>
                    <Link>
                        <img style={{
                            width: "150px",
                        }} 
                            src="src\img\logoOnlyBooksv1.jpeg" alt="OnlyBooks_Logo" />
                    </Link>
                    <div className="social-icons">
                        <Link onClick={handleClick} to={routes.WhatsApp}>
                            <WhatsAppIcon className="social-icon animation" />
                        </Link>
                        <Link onClick={handleClick} to={routes.Instagram}>
                            <InstagramIcon className="social-icon animation" />
                        </Link>
                        <Link onClick={handleClick} to={routes.Facebook}>
                            <FacebookIcon className="social-icon animation" />
                        </Link>
                        <Link onClick={handleClick} to={routes.LinkedIn}>
                            <LinkedInIcon className="social-icon animation" />
                        </Link>
                    </div>
                    <p>&copy; {new Date().getFullYear()} 2023 OnlyBooks - C13 Equipo 2</p>
                    <p className='copyright'>Todos los derechos reservados</p>
                </div>
                <div className='footer-mid'>
                    {/* <h4>COMPANY</h4>
                    <p>Projects</p>
                    <p>Contacts</p> */}
                </div>
                <div className='footer-right'>
                    {/* <h4>SERVICES</h4>
                    <p>Test</p>
                    <p>Test</p> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer;