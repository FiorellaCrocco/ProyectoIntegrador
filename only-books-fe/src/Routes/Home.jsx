/* eslint-disable no-unused-vars */
import React from 'react'
import LibrosPaginados from '../Components/LibrosPaginados/LibrosPaginados'
import Search from '../Components/Search/Search'
import data from '../Components/LibrosPaginados/libros'
import Recomendados from '../Components/Recomendados/Recomendados'
import './Home.css'


const Home = () => {
  return (
    <div className='home'>
      <Recomendados libros={data}></Recomendados>
      <Search />
      {//<LibrosPaginados libros={data}></LibrosPaginados>
      }
    </div>

  )
}

export default Home