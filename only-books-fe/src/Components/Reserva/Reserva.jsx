import styles from "./Reserva.module.css";
import { useLocation } from "react-router-dom";
import { useAccount } from "../../Context/accountContext";

const Reserva = () => {
  const { userData } = useAccount();
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const userId = user ? user.id : null;

  console.log(userId);
  const location = useLocation();
  const { libro } = location.state || {};

  console.log(libro);

  const onReserva = async (e) => {
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
              setIsTyping(true);
            }}
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
              setIsTyping(true);
            }}
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
              setIsTyping(true);
            }}
            required
            autoComplete="off"
            placeholder=" "
          />
        </div>

        <button className="btn-lr">Reservar</button>
      </form>

      <div className={styles.detailcontainer}>
        <div className={styles.bookcontainer}>
          <div className={styles.section}>
            <div className={styles.book}>
              {
                <img
                  className={styles.mainimg}
                  src={libro.listImgUrl[0]}
                  alt={libro.title}
                />
              }

              <div className={styles.sectionDetalles}>
                <div className={styles.titles}>
                  <div>
                    <h1 className={styles.bookh1}>{libro.title}</h1>{" "}
                  </div>
                  <p className={styles.bookp}>{libro.author}</p>
                  <p className={styles.bookp}>{libro.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reserva;
