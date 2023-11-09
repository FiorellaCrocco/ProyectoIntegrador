import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "../../Context/globalContext";
import './CaracteristicaLibro.css';

const CaracteristicaLibro = ({ id }) => {
  const { fetchBookById } = useContext(GlobalContext);
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      setIsLoading(true);
      const data = await fetchBookById(id);
      if (data) {
        setBookData(data);
      }
      setIsLoading(false);
    };

    loadBook();
  }, [fetchBookById, id]);

  return (
    <div className='divAmplio'>
      <h4 className='caract'>Caracteristicas</h4>
      {console.log(bookData)}
      {isLoading ? (
        <p>Cargando información...</p>
      ) : bookData && bookData.caracteristicas ? (
        <div>
          <ul className='listaCarac'>
            {bookData.caracteristicas.map((caracteristica, index) => (
              <li className='listaIcon' key={index}>
                <img src={caracteristica.icono} alt={caracteristica.title} className='imgIcono'/> 
                <p>
                  <strong>{caracteristica.title}</strong> 
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se pudieron cargar los datos del libro.</p>
      )}

    </div>
  );
}

export default CaracteristicaLibro;
