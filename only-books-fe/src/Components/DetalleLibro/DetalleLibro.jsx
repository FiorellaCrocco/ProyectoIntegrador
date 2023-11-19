import React, { useState, useContext, useEffect } from "react";
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import styles from "./DetalleLibro.module.css";
import Calendar from "react-multi-date-picker";
import Swal from 'sweetalert2'


import { GlobalContext } from "../../Context/globalContext";
import stylesM from "./Modal.module.css";
import Politicas from "../Politicas/Politicas";
import VerReservas from "./VerReservas";
import GenerateDates from "./GenerateDates";
import Resenia from "../Resenia/Resenia";
import ReseniaLista from "../ReseniaLista/ReseniaLista";

function DetalleLibro({ id }) {
  const [showPopup, setShowPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);
  const { fetchBookById } = useContext(GlobalContext);
  const [libro, setLibro] = useState(null);
  const [values, setValues] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
    setShowPopup(!showPopup);
  };

  const avanzarImagen = () => {
    if(imagenActual==libro.listImgUrl.length-1){
      setImagenActual(0)
    }else{
      setImagenActual((imagenActual + 1));
    }
  };

  const retrocederImagen = () => {
    if(imagenActual==0){
      setImagenActual(libro.listImgUrl.length-1)
    }else{
      setImagenActual(imagenActual-1)
    }
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


  const [fechasReservadas, setFechas] = useState([]);
  const [reservaLibro, setReservaLibro] = useState([])
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")



  const obtenerFechas = (datos) => {
    setFechas(datos);
  };


  const obtenerReservaLibro = (datos) =>{
    setReservaLibro(datos)
  }

  const HandleReserva=(reserva)=>{
    if(reserva.length!=0){
      setEndDate(reserva[0].returnDate)
      setStartDate(reserva[0].startDate)
    }
  }

  useEffect(()=>{
    HandleReserva(reservaLibro)
  },[reservaLibro])

  return (
    <div>
      {libro != null ? (
        <>
          <div className={styles.detailcontainer}>
            <div className={styles.bookcontainer}>
              <div className={styles.section}>
                <div className={styles.book}>
                  <img
                    className={styles.mainimg}
                    src={libro.listImgUrl[0]}
                    alt={libro.title}
                  />
                </div>
                <div className={styles.galeria}>
                  {libro.listImgUrl.slice(1, 5).map((url, index) => (
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
                    <div
                      className={
                        stylesM.carrusel
                      } /*className={styles.carrusel}*/
                    >
                      <button
                        className={stylesM.btnBack}
                        onClick={retrocederImagen}
                      >
                        &lt;
                      </button>
                      <img
                        className={stylesM.imagenCarrusel}
                        src={libro.listImgUrl[imagenActual]}
                        alt={libro.title}
                      />

                      <button
                        className={stylesM.btnNext}
                        onClick={avanzarImagen}
                      >
                        &gt;
                      </button>
                    </div>
                    <button
                      className={stylesM.closemodal}
                      onClick={toggleModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>
            <label>Ver Disponibilidad:</label>
            <VerReservas id={id} obtenerReservaLibro={obtenerReservaLibro}></VerReservas>
            <Calendar
              placeholder="Seleccione la fecha de alquiler"
              format="YYYY-MM-DD"
              value={values}
              onChange={setValues}
              range
              highlightToday={false}
              numberOfMonths={2}
              mapDays={({ date, isSameDate }) => {
                let props = {};
                fechasReservadas.map(fecha=>{
                  if(isSameDate(fecha,date)){
                    props.disabled = true;
                      props.style = {
                      ...props.style,
                      color: "#666",
                      backgroundColor: "#ccc",
                      fontWeight: "bold",
                      border: "2px solid #777",
                    };
                    props.onClick = () => {
                      Swal.fire({
                        position: "top-end",
                        text: "Ya existe reserva en esa fecha, seleccione una nueva",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                    }
                  }
                })
                  
                return props;
              }}
            />
            <GenerateDates startDate={startDate} endDate={endDate} obtenerFechas={obtenerFechas} />
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
            <Resenia id={id}/>
            <ReseniaLista id={id}/>
          </div>
          <div>
            <Politicas />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default DetalleLibro;
