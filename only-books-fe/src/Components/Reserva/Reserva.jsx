import styles from "./Reserva.module.css";
import { useLocation } from "react-router-dom";
import { useAccount } from "../../Context/accountContext";
import { useState } from "react";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const Reserva = () => {
  //const { userData } = useAccount();
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;
  const [pais, setPais] = useState("");
  const [periodo, setPeriodo] = useState(null);
  const [loginError, setLoginError] = useState("");

  const location = useLocation();
  const { libro } = location.state || {};
  const { inicio } = location.state || {};
  const { fin } = location.state || {};



  const onInputChange = (e) => {
    const { value } = e.target;
    setPais(value);
  };

  const onReserva = async (e) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const response = await fetch(url, settings);
      console.log("response: " + response);
      if (response.status === 200) {
        // Autenticación exitosa, obtener el token del cuerpo de la respuesta
        const data = await response.json();
        const { token } = data;
        sessionStorage.setItem("token", token);
        const userEmail = email; // Obtener el correo electrónico del formulario

        const settings = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const url = `${API_URL}user/perfil/${userEmail}`;
        //	const url = `https://onlybooks.isanerd.club/api/user/perfil/${userEmail}`;
        const profileDataResponse = await fetch(url, settings);

        if (profileDataResponse.status === 200) {
          const profileData = await profileDataResponse.json();
          sessionStorage.setItem("userData", JSON.stringify(profileData));
          updateUserData(profileData);
          console.log("profileData: " + profileData);

          // Aquí puedes hacer lo que necesites con los datos del perfil
          // Por ejemplo, almacenarlos en el estado local del componente

          const { name, email, profileImage } = profileData;
          console.log("Nombre: ", name);
          console.log("Correo electrónico: ", email);

          navigate("/", {
            replace: true,
            state: {
              logged: true,
            },
          });
          window.location.reload();
        }
      } else if (response.status === 403) {
        setLoginError("Credenciales incorrectas. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.log(error);
      setLoginError(
        "Ocurrió un error al iniciar sesión. Inténtelo de nuevo más tarde."
      );
    }
    onResetForm();
  };

  return (
    <>
      <form onSubmit={onReserva}>
        <h2 id="h2-form">Realizar Reserva</h2>

        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            name="name"
            id="name"
            className="input"
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
          <label htmlFor="lastname">Apellido</label>
          <input
            type="lastname"
            name="lastname"
            id="lastname"
            className="input"
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
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
          <label htmlFor="dni">DNI</label>
          <input
            type="dni"
            name="dni"
            id="dni"
            className="input"
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
          <label htmlFor="paisR">Pais de Residencia</label>
          <input
            type="paisR"
            name="paisR"
            id="paisR"
            className="input"
            value={pais}
            onChange={(e) => {
              onInputChange(e);
            }}
            autoComplete="off"
            placeholder=" "
          />
        </div>
        <div>
          <label htmlFor="periodoAlq">Periodo de Alquiler</label>
          <input
            type="periodoAlq"
            name="periodoAlq"
            id="periodoAlq"
            className="input"
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

        <button className="btn-lr">Reservar</button>
      </form>
    </>
  );
};

export default Reserva;
