import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import Favoritos from '../Favoritos/Favoritos';

const Card = ({ id, imgUrl, title, price, isFavorite, actualizarListaFav }) => (
    <div className="body-cards">
        <div className="card">
        <Favoritos variable={id} isFavorite={isFavorite} actualizarListaFav={actualizarListaFav} />
            <div className="card-img">
                <Link to={`/detail/${id}`}>
                    <img src={imgUrl} alt={title} />
                </Link>
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
            <div className="card-details">
                <div className="price">
                    <span>Precio</span>
                    <p>${price}</p>
                </div>
            </div>
            <button>Buy Now</button>
        </div>
    </div>

);

export default Card;

