import styles from "./Reserva.module.css";
import { useLocation } from "react-router-dom";
import { useAccount } from "../../Context/accountContext";
import { useEffect, useState } from "react";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const Reserva = () => {
  //const { userData } = useAccount();
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;
  const [pais, setPais] = useState("");
  const [formData, setFormData] = useState(null);

  const URL_API = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");

  const location = useLocation();
  const { libro } = location.state || {};
  const { inicio } = location.state || {};
  const { fin } = location.state || {};
  const [desactivar, setDesactivar] = useState(false)

  console.log(libro);

  const onInputChange = (e) => {
    const { value } = e.target;
    setPais(value);
  };

  const onReserva = async (e) => {
    console.log(userId);
    e.preventDefault();
    setFormData({
      user: {
        id: userId,
      },
      book: {
        id: libro.id,
      },
      startDate: inicio,
      returnDate: fin,
    });
    setDesactivar(true);
  };

  useEffect(() => {
    if (formData != null) {
      const fetchBookRent = async () => {
        const url = `${URL_API}bookRent/agregar`;
        const settings = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        };
        try {
          const response = await fetch(url, settings);
          if (response.status == 200) {
            //Mail de la reserva
            Swal.fire({
              text: "Se reservo el libro correctamente!",
              icon: "success",
            });
          } else {
            Swal.fire({
              text: "ERROR: no se pudo reservar el libro, intente mas tardeo",
              icon: "error",
            });
          }
        } catch (error) {
          console.log("Error: ", error);
        }
      };
      fetchBookRent();
    }
  }, [formData]);

  return (
    <>
      <form className={styles.form} onSubmit={onReserva}>
        <h2 className={styles.title}>Realizar Reserva</h2>

        <div className={styles.all}>
          <div className={styles.imput}>
            <div>
              <label className={styles.label} htmlFor="name">
                Nombre
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className={styles.input}
                value={user.name}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="lastname">
                Apellido
              </label>
              <input
                type="lastname"
                name="lastname"
                id="lastname"
                className={styles.input}
                value={user.lastname}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={styles.input}
                value={user.email}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="dni">
                DNI
              </label>
              <input
                type="dni"
                name="dni"
                id="dni"
                className={styles.input}
                value={user.dni}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>

            <div>
              <label className={styles.label} htmlFor="paisR">
                Pais de Residencia
              </label>
              <input
                type="paisR"
                name="paisR"
                id="paisR"
                className={styles.input}
                value={pais}
                onChange={(e) => {
                  onInputChange(e);
                }}
                autoComplete="off"
                placeholder=" "
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="periodoAlq">
                Periodo de Alquiler
              </label>
              <input
                type="periodoAlq"
                name="periodoAlq"
                id="periodoAlq"
                className={styles.input}
                value={inicio + " , " + fin}
                onChange={(e) => {
                  onInputChange(e);
                }}
                disabled
                required
                autoComplete="off"
                placeholder=" "
              />
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-info">
                <FontAwesomeIcon icon={faStarSolid} className="card-star" />
                {libro.qualification}({libro.cantResenias})
              </div>
              <div className="card-img">
                <img src={libro.imgUrl} alt={libro.title} />
              </div>
              <div className="card-title">
                <h3>{libro.title}</h3>
              </div>
              <div>
                <h5>{libro.author}</h5>
                <p>{libro.description}</p>
              </div>
              <div className="card-details">
                <div className="price">
                  <span>Precio</span>
                  <p>${libro.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className={styles.btn} disabled={desactivar}>
          Reservar
        </button>
      </form>
    </>
  );
};

export default Reserva;
