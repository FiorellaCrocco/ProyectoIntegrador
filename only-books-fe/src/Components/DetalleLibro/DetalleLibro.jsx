//import { useState, useEffect } from "react"
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import data from "../LibrosPaginados/libros";
import styles from "./DetalleLibro.module.css";


function DetalleLibro({ id }) {
  console.log("IMPRIMO EL ID");
  console.log(id);
  const libro = data.find((book) => book.id == id);
  console.log("Imprimo el libro");
  console.log(libro);

  return (
    <div className={styles.detailcontainer}>
      <div className={styles.bookcontainer}>

        <div className={styles.section}>
          <div className={styles.book}>
            <img className={styles.mainimg} src={libro.imgUrl[0]} alt={libro.title} />
          </div>
          <div className={styles.galeria}>
            <img src={libro.imgUrl[1]} alt={libro.title} />
            <img src={libro.imgUrl[2]} alt={libro.title} />
            <img src={libro.imgUrl[3]} alt={libro.title} />
            <img src={libro.imgUrl[4]} alt={libro.title} />
          </div>
        </div>
        {/* <button className={styles.btnVer}>Ver más</button> */}
      </div>
      <div className={styles.sectionDetalles}>
        <div className={styles.titles}>
          <h1 className={styles.bookh1}>{libro.title}</h1>
          <p className={styles.bookp}>{libro.author}</p>
          <p className={styles.bookp}>{libro.description}</p>
        </div>
        <button className={styles.btnAtras} onClick={() => window.history.back()}>Volver</button>
      </div>
      <CaracteristicaLibro id = {id}/>

    </div>
  );
}
export default DetalleLibro;
