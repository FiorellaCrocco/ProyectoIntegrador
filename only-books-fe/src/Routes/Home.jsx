/* eslint-disable no-unused-vars */
import React from 'react'
import LibrosPaginados from '../Components/LibrosPaginados/LibrosPaginados'
import Search from '../Components/Search/Search'
import data from '../Components/LibrosPaginados/libros'


const Home = () => {
  return (
    <div>
   <Search />
   {//<LibrosPaginados libros={data}></LibrosPaginados>
   }
    </div>
    
  )
}

export default Home