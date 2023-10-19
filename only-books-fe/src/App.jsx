
// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { routes } from './Utils/routes.js'


import { Routes, Route } from 'react-router-dom'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className="app">
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path={routes.home}></Route>



          
        </Routes>
        
      </div>
      <Footer />
    </div>
  )
}

export default App
