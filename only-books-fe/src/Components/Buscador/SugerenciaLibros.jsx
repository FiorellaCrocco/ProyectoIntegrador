import { useEffect, useState } from "react";
import styles from "./SugerenciaLibros.module.css"

function SugerenciaLibros({ listaLibros, busqueda , obtenerDatosFiltrados,actualizarBusqueda, buscando}) {

  const [mostrar, setMostrar] = useState(true)
  
    const librosFiltrados = listaLibros.filter((libro) =>
      libro.title.toLowerCase().includes(busqueda.toLowerCase())
    );

    useEffect(() => {
      obtenerDatosFiltrados(librosFiltrados);
      console.log(mostrar)
    }, [busqueda])

    useEffect(()=>{
      setMostrar(buscando)
    },[buscando])


    const handleClick =(libro)=>{
      setMostrar(false)
      actualizarBusqueda(libro)
    }
   
    const result = () => {
      if(mostrar){
        if (busqueda.length > 0) {
          return librosFiltrados.map((libro) => (
            <li className={styles.sugerenciaLibrosLi} key={libro.id} 
            onClick={()=>handleClick(libro.title)}> 
            <img className={styles.imgBusquedaMini}  src={libro.imgUrl} alt={libro.title}/>
            {libro.title}
            </li>
          ));
        } else {
          return null;
        }
      }
    };
  
    return (
      <>
      
      {result()}

      </>
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
  