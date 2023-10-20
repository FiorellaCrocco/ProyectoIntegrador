// import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className='footer-container'>
                <div className='footer-left'>
                    <Link>
                        <img style={{
                            width: "150px",
                        }} src="src\img\logoOnlyBooksv1.jpeg" alt="Logo" />
                    </Link>
                    <div className='social-icons'>
                        {/* iconos de redes sociales */}
                    </div>
                    <p>2023 OnlyBooks</p>
                    <p className='copyright'>Todos los derechos reservados</p>
                </div>
                {/* <div className='footer-mid'>
                    <h4>COMPANY</h4>
                    <p>Projects</p>
                    <p>Contacts</p>
                    <p>Open Source</p>
                    <p>blog</p>
                </div>
                <div className='footer-right'>
                    <h4>SERVICES</h4>
                    <p>Test</p>
                    <p>Test</p>
                    <p>Test</p>
                </div> */}
            </div>
        </footer>
    )
}

export default Footer