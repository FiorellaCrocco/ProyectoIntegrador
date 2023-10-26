/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
// import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../Utils/routes.js'
import './Footer.css'
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {


    // const handleClick = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };

    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-left'>
                    {/* <Link to='/'> */}
                        <img className='logo-footer'
                            style={{
                                width: "150px",
                            }}
                            src="https://onlybooksbucket.s3.amazonaws.com/Productos/logoOnlyBooksv2+(2).png" alt="OnlyBooks_Logo" />
                    {/* </Link> */}
                    <div className="social-icons">
                        <a href="https://www.whatsapp.com/" target="_blank"><WhatsAppIcon className="social-icon animation" /></a>
                        <a href="https://www.instagram.com/" target="_blank"><InstagramIcon className="social-icon animation" /></a>
                        <a href="https://www.facebook.com/" target="_blank"><FacebookIcon className="social-icon animation" /></a>
                        <a href="https://uy.linkedin.com/" target="_blank"><LinkedInIcon className="social-icon animation" /></a>
                        {/* <Link onClick={handleClick} to={routes.WhatsApp}>
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
                        </Link> */}
                    </div>
                    <p className='copyright'>&copy; {new Date().getFullYear()} OnlyBooks - C13 Equipo 2</p>
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