
// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { routes } from './Utils/routes.js'
import LibrosPaginados from './Components/LibrosPaginados/LibrosPaginados.jsx';
import data from './Components/LibrosPaginados/libros'



import { Routes, Route } from 'react-router-dom'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />
      <LibrosPaginados libros = {data}></LibrosPaginados>


      <div className="content-container">
        <Routes>
          <Route path={routes.home}></Route>
          
        </Routes>
        {/* <AddProduct/> */}
      </div>
      <Footer />
    </div>
  )
}

export default App
