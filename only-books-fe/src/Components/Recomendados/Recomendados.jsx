import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import '../LibrosPaginados/LibrosPaginados.css'
import style from './Recomendados.module.css'

function Recomendados({ libros }) {
    console.log(libros)
    const [librosAleatorios, setLibrosAleatorios] = useState([])
    const selectLibrosAleatorios = () => {
        const librosSeleccionados = []
        while (librosSeleccionados.length < 3) {
            const randomIndex = Math.floor(Math.random() * libros.length)
            if (!librosSeleccionados.includes(libros[randomIndex])) {
                librosSeleccionados.push(libros[randomIndex])
            }
        }
        setLibrosAleatorios(librosSeleccionados)
    }
    useEffect(()=>{
        selectLibrosAleatorios()
    },[])

    return (
        <>
            <section className={style.listaContainer}>
                <h1 className={style.recomendacion}>RECOMENDADOS</h1>
                <ul className={style.listaPaginada}>
                    {
                    librosAleatorios.map((libro) => {
                        return (
                            <li className={style.book} key={libro.id}>
                                <Link to={`/detail/${libro.id}`}>
                                    <img src={libro.imgUrl[0]} alt={libro.title} />
                                </Link>
                                <p className={style.title}>{libro.title}</p>
                                <p className={style.price}>${libro.price}</p>
                            </li>)
                    })}
                </ul>
            </section>
        </>
    )
}

export default Recomendados