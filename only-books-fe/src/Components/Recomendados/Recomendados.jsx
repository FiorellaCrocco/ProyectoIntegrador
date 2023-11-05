import { useContext } from "react";
import { GlobalContext } from "../../Context/globalContext";
import { Link } from "react-router-dom";
import "../LibrosPaginados/LibrosPaginados.css";
import style from "./Recomendados.module.css";
import '../Loading/Loading.css'

const Recomendados = () => {
  const { listaLibros, isLoading } = useContext(GlobalContext);

  // console.log(listaLibros);
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

  if (isLoading) {
    return <div className="loader"></div>;
  }

  if (!listaLibros || listaLibros.length === 0) {
    return <div>No se encontraron libros.</div>;
  }

  const librosAleatorios = selectLibrosAleatorios(listaLibros, 3);

  return (
    <>
      <section className={style.listaContainer}>
        <h1 className={style.recomendacion}>Recomendados</h1>
				{isLoading?<div className="loader"></div>:<></>}
        <ul className={style.listaPaginada}>
          {librosAleatorios.map((libro) => {
            return (
              <li className={style.book} key={libro.id}>
                <Link to={`/detail/${libro.id}`}>
                  <img src={libro.imgUrl[0]} alt={libro.title} />
                </Link>
                <p className={style.title}>{libro.title}</p>
                <p className={style.price}>${libro.price}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Recomendados;
