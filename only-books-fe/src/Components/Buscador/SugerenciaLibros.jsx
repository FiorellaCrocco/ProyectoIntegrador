import { useEffect } from "react";
import styles from "./SugerenciaLibros.module.css"

function SugerenciaLibros({ listaLibros, busqueda , obtenerDatosFiltrados}) {
  
    const librosFiltrados = listaLibros.filter((libro) =>
      libro.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
      obtenerDatosFiltrados(librosFiltrados);
      console.log("Sugerencia", librosFiltrados);
    }, [busqueda])
   
    const result = () => {
      if (busqueda.length >= 3) {
        return librosFiltrados.map((libro) => (
          <span key={libro.id}>{libro.title}</span>
        ));
      } else {
        return null;
      }
    };
  
    return (
      <></>
    );
  }
  
  export default SugerenciaLibros;
  
  /*import { useEffect } from "react";
import styles from "./SugerenciaLibros.module.css";

function SugerenciaLibros({ listaLibros, busqueda, obtenerDatosFiltrados }) {
  const librosFiltrados = listaLibros.filter((libro) =>
    libro.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  useEffect(() => {
    if (busqueda.length >= 3) {
      obtenerDatosFiltrados(librosFiltrados);
    } else {
      obtenerDatosFiltrados([]);
    }
  }, [busqueda, librosFiltrados, obtenerDatosFiltrados]);

  return (
    <div className={styles.sugerenciaLibros}>
      <h2>Sugerencias</h2>
      <p>{busqueda.length >= 3 ? librosFiltrados.map((libro) => <span key={libro.id}>{libro.title}</span>) : null}</p>
    </div>
  );
}

export default SugerenciaLibros;
*/
  