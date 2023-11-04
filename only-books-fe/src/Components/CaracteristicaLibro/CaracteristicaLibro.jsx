import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CakeIcon from '@mui/icons-material/Cake';
import ExplicitIcon from '@mui/icons-material/Explicit';
import './CaracteristicaLibro.css'

const CaracteristicaLibro = () => {
  return (
    <div className='divAmplio'> 
        <h4 className='caract'>Caracteristicas</h4>
        <ul className='listaCarac'>
            <li className='listaIcon'>
                <LanguageIcon />
                <p>Ingles</p>
            </li>
            
            <li className='listaIcon'>
                <AutoStoriesIcon/>
                <p>250 paginas</p>
            </li>
            
            <li className='listaIcon'>
                <CakeIcon/>
                <p>Mayores de 13</p>
            </li>

            <li className='listaIcon'>
                <ExplicitIcon/>
                <p>Si</p>
            </li>


        </ul>


    </div>
  )
}

export default CaracteristicaLibro