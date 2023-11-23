import { useContext, useEffect, useState, memo } from "react";
import { GlobalContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import "../LibrosPaginados/LibrosPaginados.css";
import style from "./Recomendados.module.css";
import '../Loading/Loading.css'
// import Subnavbar from "../Subnavbar/Subnavbar";

const Recomendados = memo(( {libros} ) => {

  const { isLoading } = useContext(GlobalContext);
  const [librosAleatorios, setLibrosAleatorios] = useState([]);


  const selectLibrosAleatorios = (libros, cantidad) => {
    const librosSeleccionados = [];
    while (librosSeleccionados.length < cantidad) {
      const randomIndex = Math.floor(Math.random() * libros.length);
      if (!librosSeleccionados.includes(libros[randomIndex])) {
        librosSeleccionados.push(libros[randomIndex]);
      }
    }
    return librosSeleccionados;
  };

useEffect(() => {
  if (!isLoading && libros && libros.length > 0) {
    setLibrosAleatorios(selectLibrosAleatorios(libros, 3));
  }
}, [libros, isLoading]);

  return (
    <div>

      <section className={style.listaContainer}>
        {/* <Subnavbar /> */}
        <h1 className={style.recomendacion}>Recomendados</h1>
        {isLoading ? <div className="custom-loader"></div> : <></>}
        <ul className={style.listaPaginada}>
          {librosAleatorios.map((libro) => {
            return (
              <li className={style.book} key={libro.id}>
                <Link to={`/detail/${libro.id}`}>
                  <img src={libro.imgUrl} alt={libro.title} />
                </Link>
                <p className={style.title}>{libro.title}</p>
                <p className={style.price}>${libro.price}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
});

export default Recomendados;
