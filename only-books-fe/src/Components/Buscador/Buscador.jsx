import { useEffect, useState } from "react";
import Calendar from "react-multi-date-picker";
function Buscador({obtenerDatos}) {

  const [values, setValues] = useState([]);
  const[fechaInicio, setFechaInicio] = useState("")
  const[fechaFin, setFechaFin] = useState("")
  
  
  function handleSubmit(e){
      e.preventDefault();
      setFechaInicio(values.toString().split(',')[0])
      setFechaFin(values.toString().split(',')[1])
    }
    useEffect(()=>{
        //Enviar Datos a la BDD
        obtenerDatos(fechaInicio,fechaFin)
        

    },[fechaInicio,fechaFin])
    
  return (
    <>
      <section>
        <div>
          <form
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2>Titulo:</h2>
            <input type="text" name="busqueda" id="busqueda" />

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

        </div>
      </section>
    </>
  );
}
export default Buscador;
