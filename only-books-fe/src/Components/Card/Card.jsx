import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, imgUrl, title, price }) => (
    <li className="book" key={id}>
        <Link to={`/detail/${id}`}>
            <img src={imgUrl} alt={title} />
        </Link>
        <p className="title">{title}</p>
        <p className="price">${price}</p>
    </li>
);

export default Card;
