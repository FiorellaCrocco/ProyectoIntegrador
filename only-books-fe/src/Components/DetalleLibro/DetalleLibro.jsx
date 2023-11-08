import React, { useState } from "react";
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import data from "../LibrosPaginados/libros";
import styles from "./DetalleLibro.module.css";
import "./Modal.css";

function DetalleLibro({ id }) {
  const libro = data.find((book) => book.id == id);
  const [modal, setModal] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  const toggleModal = () => {
    setModal(!modal);
  };

  const avanzarImagen = () => {
    setImagenActual((imagenActual + 1) % libro.imgUrl.length);
  };

  const retrocederImagen = () => {
    setImagenActual((imagenActual - 1 + libro.imgUrl.length) % libro.imgUrl.length);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  return (
    <div className={styles.detailcontainer}>
      <div className={styles.bookcontainer}>
        <div className={styles.section}>
          <div className={styles.book}>
            <img className={styles.mainimg} src={libro.imgUrl[imagenActual]} alt={libro.title} />
          </div>
          <div className={styles.galeria}>
            {libro.imgUrl.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`${libro.title} - Imagen ${index + 1}`}
                className={index === imagenActual ? styles.active : ""}
              />
            ))}
          </div>
        </div>

        <button className={styles.btnVer} onClick={toggleModal}>
          Ver más
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div className="carrusel"/*className={styles.carrusel}*/>

                <button className="btnBack" onClick={retrocederImagen}>&lt;</button>
                <img className="imagenCarrusel" src={libro.imgUrl[imagenActual]} alt={libro.title} />
              
                <button className="btnNext" onClick={avanzarImagen}>&gt;</button>
              </div>
              <button className="close-modal" onClick={toggleModal}>
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
    </div>
  );
}

export default DetalleLibro;


