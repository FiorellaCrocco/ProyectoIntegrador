import { useEffect, useState } from "react";
import Calendar from "react-multi-date-picker";
import SugerenciaLibros from "./SugerenciaLibros";

function Buscador({ obtenerDatos , listaLibros}) {
  const [values, setValues] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [busqueda, setBusqueda] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setFechaInicio(values.toString().split(",")[0]);
    setFechaFin(values.toString().split(",")[1]);
  }

  useEffect(() => {
    //Enviar Datos a la BDD
    obtenerDatos(fechaInicio, fechaFin, busqueda);
  }, [fechaInicio, fechaFin]);

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
            <input
              type="text"
              name="busqueda"
              id="busqueda"
              value={busqueda}
              onChange={handleChange}
            />

            <Calendar
              format="YYYY-MM-DD"
              value={values}
              onChange={setValues}
              range
              highlightToday={false}
              numberOfMonths={2}
            />

            <button>Buscar</button>
          </form>
          <SugerenciaLibros listaLibros={listaLibros} busqueda={busqueda}/>
        </div>
      </section>
    </>
  );
}
export default Buscador;
