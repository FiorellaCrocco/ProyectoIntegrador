import { useEffect, useState } from "react";
import Calendar from "react-multi-date-picker";
import SugerenciaLibros from "./SugerenciaLibros";

function Buscador({ obtenerDatos , listaLibros, obtenerDatosFilt}) {
  const [values, setValues] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [librosFiltrados, setLibrosFiltrados] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if(values != null){
      setFechaInicio(values.toString().split(",")[0]);
      setFechaFin(values.toString().split(",")[1]);
    } else {
      setFechaInicio("")
      setFechaFin("")
    }
  }

  useEffect(() => {
    //Enviar Datos a la BDD
    obtenerDatos(fechaInicio, fechaFin);
  }, [fechaInicio, fechaFin]);
 
  useEffect(() => {
    //Enviar Datos a la BDD
    obtenerDatosFilt( librosFiltrados);
  }, [librosFiltrados]);

  const obtenerDatosFiltrados = (librosFiltrados) => {
    setLibrosFiltrados(() => librosFiltrados);
    console.log("Buscador", librosFiltrados);
  }
  

  const handleChange = (e) => {
    const {value} = e.target
    setBusqueda(value);
  };

  return (
    <>
      <section>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Buscador de libros:</h2>
            <label>Busqueda por título:</label>
            <input
            placeholder="Escriba aquí el título a buscar"
              type="text"
              name="busqueda"
              id="busqueda"
              value={busqueda}
              onChange={handleChange}
            />
          <label>Busqueda por fecha disponible</label>
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
          </form>
          <SugerenciaLibros listaLibros={listaLibros} busqueda={busqueda} obtenerDatosFiltrados={obtenerDatosFiltrados}/>
        </div>
      </section>
    </>
  );
}
export default Buscador;
