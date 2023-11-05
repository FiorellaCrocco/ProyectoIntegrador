import React, { useState, useEffect } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CakeIcon from '@mui/icons-material/Cake';
import ExplicitIcon from '@mui/icons-material/Explicit';
import './CaracteristicaLibro.css';
// import data from '../LibrosPaginados/libros';

const CaracteristicaLibro = ({id}) => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch(`http://localhost:5173/book/${id}`) //la URL actual API endpoint
      .then(response => response.json())
      .then(data => setBookData(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(bookData)
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div className='divAmplio'> 
        <h4 className='caract'>Caracteristicas</h4>
        {bookData ? (
          <ul className='listaCarac'>
            <li className='listaIcon'>
                <LanguageIcon />
                <p>{bookData.language}</p>
            </li>
            
            <li className='listaIcon'>
                <AutoStoriesIcon/>
                <p>{bookData.pages} paginas</p>
            </li>
            
            <li className='listaIcon'>
                <CakeIcon/>
                <p>{bookData.ageRestriction}</p>
            </li>

            <li className='listaIcon'>
                <ExplicitIcon/>
                <p>{bookData.explicit ? 'Si' : 'No'}</p>
            </li>
          </ul>
        ) : (
          <p>Cargando informacion...</p>
        )}
    </div>
  );
}

export default CaracteristicaLibro;