import React, { useState, useContext, useEffect } from "react";
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import styles from "./DetalleLibro.module.css";
import { GlobalContext } from "../../Context/globalContext";

function DetalleLibro({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const { fetchBookById } = useContext(GlobalContext);
  const[libro, setLibro]= useState(null)

  useEffect(()=>{
    const getLibro = async ()=>{
      const libroData = await fetchBookById(id)
      setLibro(libroData)
      console.log(libro)
    }
    getLibro();

  },[id,fetchBookById])
  
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);
  

  return (
    <>
    {
      libro!=null? <div className={styles.detailcontainer}>
      <div className={styles.bookcontainer}>
        <div className={styles.section}>
          <div className={styles.book}>
            {console.log(libro)}
            <img className={styles.mainimg} src={libro.imgUrl[0]} alt={libro.title} />
          </div>
          <div className={styles.galeria}>
            <img src={libro.imgUrl[1]} alt={libro.title} />
            <img src={libro.imgUrl[2]} alt={libro.title} />
            <img src={libro.imgUrl[3]} alt={libro.title} />
            <img src={libro.imgUrl[4]} alt={libro.title} />
          </div>
        </div>
        <button className={styles.btnVer} onClick={openPopup}>
          Ver más
        </button>

        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              CONTENIDO DEL POPUP AGREGAR
              <br></br>
              <button className={styles.closeBtn} onClick={closePopup}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.sectionDetalles}>
        <div className={styles.titles}>
          <h1 className={styles.bookh1}>{libro.title}</h1>
          <p className={styles.bookp}>{libro.author}</p>
          <p className={styles.bookp}>{libro.description}</p>
        </div>
        <button className={styles.btnAtras} onClick={() => window.history.back()}>
          Volver
        </button>
      </div>
      <CaracteristicaLibro id={id} />
      
    </div>:<div>CARGANDO</div>
    }
    </>
  );
}

export default DetalleLibro;

