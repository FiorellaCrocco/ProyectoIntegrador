import React, { useState, useContext, useEffect } from "react";
import CaracteristicaLibro from "../CaracteristicaLibro/CaracteristicaLibro";
import styles from "./DetalleLibro.module.css";
import Calendar from "react-multi-date-picker";
import Swal from "sweetalert2";
import { FaShare } from "react-icons/fa";
import SharePopup from "./SharePopup";
import { GlobalContext } from "../../Context/globalContext";
import stylesM from "./Modal.module.css";
import Politicas from "../Politicas/Politicas";
import VerReservas from "./VerReservas";
import GenerateDates from "./GenerateDates";
import Resenia from "../Resenia/Resenia";
import ReseniaLista from "../ReseniaLista/ReseniaLista";
import Modal from "./ModalShare";
import Favoritos from "../Favoritos/Favoritos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

function DetalleLibro({ id }) {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupShare, setShowPopupShare] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);
  const { fetchBookById, fetchListaFavoritos, favoritos } = useContext(GlobalContext);
  const [libro, setLibro] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [values, setValues] = useState([]);
  const [fechasReservadas, setFechas] = useState([]);
  const [reservaLibro, setReservaLibro] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [noDisponible, setNoDisponible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date().getDate();


  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const día = fechaActual.getDate().toString().padStart(2, "0");

  const fechaFormateada = `${año}-${mes}-${día}`;

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [shareData, setShareData] = useState({
    title: "",
    description: "",
    image: "",
    link: `https://onlybooks.isanerd.club/detail/${id}`,
  });


  const toggleGalleryModal = () => {
    setShowGalleryModal(!showGalleryModal);
    document.body.style.overflow = showGalleryModal ? "auto" : "hidden";
    setShowPopup(!showPopup);
  };

  const toggleShareModal = () => {
    setShowShareModal(!showShareModal);
    setShowPopupShare(true);
  };

  const avanzarImagen = () => {
    setImagenActual((imagenActual + 1) % libro.listImgUrl.length);
  };

  const retrocederImagen = () => {
    setImagenActual(
      (imagenActual - 1 + libro.listImgUrl.length) % libro.listImgUrl.length
    );
  };

  useEffect(() => {
    if (location.state != null) {
      setValues([location.state.inicio, location.state.fin]);
    }
  }, []);

  useEffect(() => {
    const getLibro = async () => {
      const libroData = await fetchBookById(id);

      setLibro(libroData);
      setShareData({
        title: libroData.title,
        description: libroData.description,
        image: libroData.listImgUrl[0],
        link: `https://onlybooks.isanerd.club/detail/${id}`,
      });
    };
    getLibro();
    window.scrollTo(0, 0);
  }, [id, fetchBookById]);

  useEffect(() => {
    const fetch = async () => {
      // const listaFav = await fetchListaFavoritos();
      // listaFav.map((book) => {
      //   if (book.id == id) {
      //     setIsFavorite(true);
      //   }
      // });
      console.log(favoritos)
      favoritos.forEach((book)=>{

        console.log(id)
        if(book.id==id){
          console.log("ES FAVORITO")
          setIsFavorite(true)
          console.log(isFavorite)
        }
      })
    };
    fetch();
  }, [id, favoritos]);

  const obtenerFechas = (datos) => {
    setFechas(datos);
  };

  const obtenerReservaLibro = (datos) => {
    setReservaLibro(datos);
  };

  const HandleReserva = (reserva) => {
    if (reserva.length !== 0) {
      setEndDate(reserva[0].returnDate);
      setStartDate(reserva[0].startDate);
    }
  };
  useEffect(() => {
    HandleReserva(reservaLibro);
  }, [reservaLibro]);

  useEffect(() => {
    // console.log(values);
    // console.log(fechasReservadas);
    setNoDisponible(
      validarFechaReservada(values[0], values[1], fechasReservadas)
    );
  }, [values]);

  useEffect(() => {
    if (noDisponible) {
      Swal.fire({
        position: "top-end",
        text: "Ya existe reserva en esa fecha, seleccione una nueva",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [noDisponible]);

  const validarFechaReservada = (inicio, fin, fechasReservadas) => {
    for (let i = 0; i < fechasReservadas.length; i++) {
      if (fechasReservadas[i] >= inicio && fechasReservadas[i] <= fin) {
        return true;
      }
    }
    return false;
  };


  const handleReservar = (e) => {
    console.log(values);
    if (values.length > 1 && values[0] != "" && values[0 !=" "]) {
      e.preventDefault();
      console.log(libro);
      const inicio = values.toString().split(",")[0];
      const fin = values.toString().split(",")[1];

      if (userData) {
        navigate("/reservar", {
          replace: true,
          state: {
            libro: libro,
            logged: true,
            inicio: inicio,
            fin: fin,
          },
        });
      } else {
        navigate("/login", {
          state: {
            key: "loginReserva",
            msg: "Es necesario iniciar sesion para reservar un libro",
          },
        });
      }

      console.log("adentro handle");
    } else {
      Swal.fire({
        position: "top-end",
        text: "Debe seleccionar un periodo de reserva",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const clearCalendar = () => {
    setValues([]);
  };

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

              <button className={styles.btnVer} onClick={toggleGalleryModal}>
                Ver más
              </button>

              {showGalleryModal && (
                <div className={stylesM.modal}>
                  {/* <div onClick={toggleModal} className={stylesM.overlay}></div> */}
                  <div className={stylesM.modalcontent}>
                    <div className={stylesM.carrusel}>
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
                      onClick={toggleGalleryModal}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.reservaContainer}>
              <label className={styles.dispo}>Ver Disponibilidad:</label>
              <VerReservas
                id={id}
                obtenerReservaLibro={obtenerReservaLibro}
              ></VerReservas>
              <div className={styles.calendarioBtn}>
                <Calendar
                  editable={false}
                  placeholder="Seleccione la fecha de alquiler"
                  format="YYYY-MM-DD"
                  value={values}
                  onChange={setValues}
                  range
                  highlightToday={false}
                  numberOfMonths={2}
                  minDate={fechaFormateada}
                  mapDays={({ date, isSameDate }) => {
                    let props = {};
                    fechasReservadas.map((fecha) => {
                      if (isSameDate(fecha, date)) {
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
                            timer: 3000,
                          });
                        };
                      }
                    });

                    return props;
                  }}
                />
                <button
                  className={styles.reservaButton}
                  type="submit"
                  onClick={handleReservar}
                >
                  Reservar
                </button>
                <button className={styles.borrarButton} onClick={clearCalendar}>
                  Borrar
                </button>
              </div>
            </div>

            <GenerateDates
              startDate={startDate}
              endDate={endDate}
              reservas={reservaLibro}
              obtenerFechas={obtenerFechas}
            />

            <div className={styles.sectionDetalles}>
              <div className={styles.titles}>
                <div className={styles.tituloContainer}>
                  <h1 className={styles.bookh1}>{libro.title}</h1>
                  <div className={styles.iconosContainer}>
                    <FontAwesomeIcon icon={faStarSolid} className="card-star" />
                    <span className={styles.qualificationInfo}>
                      {libro.qualification}/5
                    </span>
                    <span className={styles.favIcon}
                    >
                      <Favoritos
                        variable={id}
                        isFavorite={isFavorite}
                        actualizarListaFav={fetchListaFavoritos}
                        libro={libro}
                      ></Favoritos>
                    </span>
                  </div>
                </div>
                <p className={styles.bookp}>{libro.author}</p>
                <p className={styles.bookp}>{libro.description}</p>
              </div>

              <button className={styles.btnAtras} onClick={() => navigate("/")}>
                Volver
              </button>

              {/* <CompartirRedes shareData={shareData} /> */}
              <button
                className={styles.customButton}
                onClick={toggleShareModal}
              >
                <FaShare className={styles.shareIcon} />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  Compartir
                </span>
              </button>

              {showShareModal && (
                <Modal onClose={() => setShowShareModal(false)}>
                  {showPopupShare && (
                    <SharePopup
                      shareData={shareData}
                      onClose={() => setShowPopupShare(false)}
                    />
                  )}
                </Modal>
              )}
              {/* {console.log('shareData DetalleLibro: ' + shareData.title)}
              {console.log('shareData DetalleLibro: ' + shareData.description)} */}
            </div>
            {libro.categorias ? (
              <div>
                <h4 className={styles.categ}>Categorias</h4>
                <ul className={styles.listaCateg}>
                  {libro.categorias.map((categoria, index) => (
                    <li className={styles.listaIcon} key={index}>
                      <p className={styles.pCat}>{categoria.titulo}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <CaracteristicaLibro id={id} />

            <Resenia id={id} />
            <ReseniaLista id={id} />
          </div>
          <div>
            <Politicas />
          </div>
        </>
      ) : (
        <>
          <div className={styles.detailContainerEmpty}>
            <div className="custom-loader"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetalleLibro;

const style = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  copyContainer: {
    border: "1px solid blue",
    background: "rgb(0,0,0,0.7)",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};
