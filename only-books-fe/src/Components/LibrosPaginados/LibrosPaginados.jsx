/* eslint-disable no-unused-vars */
import { useState } from "react";
import './LibrosPaginados.css'

function LibrosPaginados({libros}){
    const librosPorPagina= 10;
    const [pagina, setPagina] = useState(1)

    const startIndex = (pagina - 1)*librosPorPagina
    const endIndex = startIndex + librosPorPagina
    const currentItem = libros.slice(startIndex,endIndex)



    const nextPage = () =>{
        if(pagina<Math.ceil(libros.length/librosPorPagina)){
            setPagina(pagina +1)
        }
    }
    const prevPage = () =>{
        if(pagina>1){
            setPagina(pagina-1)
        }
    }
    return(
        <>
        <div className="listaContainer">
            <ul className="listaPaginada">
                {currentItem.map((item) =>{
                    // {console.log(item)}
                    return <li className="book" key={item.id}><img src={item.imgUrl}/><p>{item.title}</p> <p className="price">${item.price}</p></li>
                })}
            </ul>
            <button className="btn-anterior" onClick={prevPage} disabled={pagina===1}>
                Anterior
            </button>
            <button className="btn-siguiente" onClick={nextPage} disabled={pagina===Math.ceil(libros.length/librosPorPagina)}>
                Siguiente
            </button>
        </div>
        </>
    )
}

export default LibrosPaginados