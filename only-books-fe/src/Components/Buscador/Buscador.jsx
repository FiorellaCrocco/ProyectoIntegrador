import { useEffect, useState } from "react";
import Calendar from "react-multi-date-picker";
import SugerenciaLibros from "./SugerenciaLibros";
import "./Buscador.css";

function Buscador({ obtenerDatos, listaLibros, obtenerDatosFilt }) {
  const [values, setValues] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [librosFiltrados, setLibrosFiltrados] = useState([]);

  const [mostrar, setMostrar] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    if (values != null) {
      setFechaInicio(values.toString().split(",")[0]);
      setFechaFin(values.toString().split(",")[1]);
    } else {
      setFechaInicio("");
      setFechaFin("");
    }
  }

  useEffect(() => {
    //Enviar Datos a la BDD
    obtenerDatos(fechaInicio, fechaFin);
  }, [fechaInicio, fechaFin]);

  useEffect(() => {
    //Enviar Datos a la BDD
    obtenerDatosFilt(librosFiltrados);
  }, [librosFiltrados]);

  const obtenerDatosFiltrados = (librosFiltrados) => {
    setLibrosFiltrados(() => librosFiltrados);
    //console.log("Buscador", librosFiltrados);
  };
  const actualizarBusqueda = (libro)=>{
    setBusqueda(libro);
    setMostrar(false)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setBusqueda(value);
  };
  const handleBuscando=()=>{
    setMostrar(true)
  }


  return (
    <>
      <section className="buscador-section">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2 className="buscador-title">Buscador de libros:</h2>
            <div className="busquedaContainer">
              <div className="busquedaTituloContainer">
                <label>Busqueda por título:</label>
                <input
                  className="inputBusqueda"
                  placeholder="Escriba aquí el título a buscar"
                  type="text"
                  name="busqueda"
                  id="busqueda"
                  autoComplete="off"
                  value={busqueda}
                  onChange={handleChange}
                  onMouseDown={handleBuscando}
                />
                <ul className="options-list">
                    <SugerenciaLibros
                      listaLibros={listaLibros}
                      busqueda={busqueda}
                      obtenerDatosFiltrados={obtenerDatosFiltrados}
                      actualizarBusqueda={actualizarBusqueda}
                      buscando={mostrar}
                    />
                </ul>
              </div>

              <div className="busquedaFechaContainer">
                <label>Busqueda por fecha disponible</label>
                <div className="fecha-botonContainer">
                <Calendar
                  placeholder="Seleccione la fecha de alquiler"
                  format="YYYY-MM-DD"
                  value={values}
                  onChange={setValues}
                  range
                  highlightToday={false}
                  numberOfMonths={2}
                />

                <button>Buscar</button>
                </div>
              </div>
            </div>
          </form>
      </section>
    </>
  );
}
export default Buscador;
