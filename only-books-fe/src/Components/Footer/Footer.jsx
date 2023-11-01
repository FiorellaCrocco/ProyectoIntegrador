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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';



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

                    <p className='copyright'>&copy; {new Date().getFullYear()} OnlyBooks - C13 Equipo 2</p>
                    <p className='copyright'>Todos los derechos reservados</p>
                </div>
                <div className='footer-mid'>
                    {/* <h4>COMPANY</h4>
                    <p>Projects</p>
                    <p>Contacts</p> */}
                </div>
                <div className='footer-right'>
                    {/* <h4>CONTACTO</h4> */}
                    <ul>
                        <li className="item">
                            <a href="https://www.instagram.com/">
                                <FontAwesomeIcon className='icon' icon={faInstagram} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://www.linkedin.com">
                                <FontAwesomeIcon className='icon' icon={faLinkedin} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://www.youtube.com">
                                {/* <i className="fa-brands fa-youtube icon"></i> */}
                                <FontAwesomeIcon className='icon' icon={faYoutube} />
                            </a>
                        </li>
                        <li className="item">
                            <a href="https://twitter.com">
                                {/* <i className="fa-brands fa-x-twitter icon"></i> */}
                                <FontAwesomeIcon className='icon' icon={faXTwitter} />
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    )
}

export default Footer;