import React, { useState, useContext, useEffect } from "react";
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import styles from "./DetalleLibro.module.css";
import { GlobalContext } from "../../Context/globalContext";
import stylesM from "./Modal.module.css";

function DetalleLibro({ id }) {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const [modal, setModal] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);
  const { fetchBookById } = useContext(GlobalContext);
  const [libro, setLibro] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
    setShowPopup(!showPopup);
  };

  const avanzarImagen = () => {
    setImagenActual((imagenActual + 1) % libro.imgUrl.length);
  };

  const retrocederImagen = () => {
    setImagenActual(
      (imagenActual - 1 + libro.imgUrl.length) % libro.imgUrl.length
    );
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    const getLibro = async () => {
      const libroData = await fetchBookById(id);
      setLibro(libroData);
    };
    getLibro();
  }, [id, fetchBookById]);

  return (
    <div>
      {libro != null ? (
        <div className={styles.detailcontainer}>
          <div className={styles.bookcontainer}>
            <div className={styles.section}>
              <div className={styles.book}>
                <img
                  className={styles.mainimg}
                  src={libro.imgUrl[0]}
                  alt={libro.title}
                />
              </div>
              <div className={styles.galeria}>
                {libro.imgUrl.slice(0, 4).map((url, index) => (
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
              <div className={stylesM.modal}>
                <div onClick={toggleModal} className={stylesM.overlay}></div>
                <div className={stylesM.modalcontent}>
                  <div className={stylesM.carrusel} /*className={styles.carrusel}*/>
                    <button className={stylesM.btnBack} onClick={retrocederImagen}>
                      &lt;
                    </button>
                    <img
                      className={stylesM.imagenCarrusel}
                      src={libro.imgUrl[imagenActual]}
                      alt={libro.title}
                    />

                    <button className={stylesM.btnNext} onClick={avanzarImagen}>
                      &gt;
                    </button>
                  </div>
                  <button className={stylesM.closemodal} onClick={toggleModal}>
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
            <button
              className={styles.btnAtras}
              onClick={() => window.history.back()}
            >
              Volver
            </button>
          </div>
          <CaracteristicaLibro id={id} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default DetalleLibro;
