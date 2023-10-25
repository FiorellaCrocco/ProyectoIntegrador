import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
// import { routes } from './Utils/routes.js'
import Administrador from './Routes/Administrador'
import CargarProducto from './Components/Administrador/CargarProducto'
import Home from './Routes/Home';
import ListarProducto from './Components/Administrador/ListarProducto'


import { Routes, Route } from 'react-router-dom'
import Detail from './Routes/Detail'

function App() {
  //const [count, setCount] = useState(0)

  return (

    <div className="app">
      <Navbar />

      <div className="content-container">
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/administrador/cargar' Component={CargarProducto}></Route>
          <Route path='/administrador' Component={Administrador}></Route>
          <Route path='/detail/:id' Component={Detail}></Route>
          <Route path='/administrador/listar' Component={ListarProducto}></Route>

        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App