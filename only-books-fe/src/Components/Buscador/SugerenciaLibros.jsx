import styles from "./SugerenciaLibros.module.css"

function SugerenciaLibros({ listaLibros, busqueda }) {
  
    const librosFiltrados = listaLibros.filter((libro) =>
      libro.title.toLowerCase().includes(busqueda.toLowerCase())
    );
   
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
      <div className={styles.sugerenciaLibros}>
        <h2>Sugerencias</h2>
        <p>{result()}</p>
      </div>
    );
  }
  
  export default SugerenciaLibros;
  
  