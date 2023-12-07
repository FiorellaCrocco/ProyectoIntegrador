import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "./Hook/UseForm";
import "./log&register.css";
import { useAccount } from "../../Context/accountContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../Context/globalContext";

export const LoginPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { fetchData } = useContext(GlobalContext);
  const url = `${API_URL}auth/login`;
  //	const url = "https://onlybooks.isanerd.club/api/auth/login";
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password, onInputChange, onResetForm } = useForm({
    email: "",
    password: "",
  });

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  };
  useEffect(() => {}, []);

  const { updateUserData } = useAccount();

  const onLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setIsTyping(false);

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
          console.log(location);
          if (location.state != null) {
            navigate(-1);
          } else {
            fetchData()
            navigate("/", {
              replace: true,
              state: {
                logged: true,
              },
            });
          }
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

  function passwordChangeHandler() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login-containerL">
      <div className="wrapper">
        <form onSubmit={onLogin}>
          {location.state != null ? <p>{location.state.msg}</p> : <></>}
          <h2 id="h2-form">Iniciar Sesión</h2>

          <div className="input-group">
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              value={email}
              onChange={(e) => {
                onInputChange(e);
                setIsTyping(true);
              }}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label className="label" htmlFor="email">
              Email
            </label>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => {
                onInputChange(e);
                setIsTyping(true);
              }}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <div className="eye-icon" onClick={() => passwordChangeHandler()}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {!isTyping && loginError && (
            <p className="error-message">{loginError}</p>
          )}
          <button className="btn-lr">Iniciar Sesion</button>
          <p>
            No tienes cuenta? <Link to="/registrarse">Registrate aqui!</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
