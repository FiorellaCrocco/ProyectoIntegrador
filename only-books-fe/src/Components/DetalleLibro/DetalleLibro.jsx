import { useState, useEffect } from "react"
import  data  from '../LibrosPaginados/libros'

function DetalleLibro({id}){
    console.log("IMPRIMO EL ID")
    console.log(id)
    const libro = data.find((book)=>book.id==id)
    console.log("Imprimo el libro")
    console.log(libro)

    /*
    useEffect(()=>{
        const config ={
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
        }
        fetch(`/LibrosPaginados/libros.js`,config)
            .then(response=>{
                if(!response.ok){
                    throw new Error('No se encuentra el libro.')
                }
                return response.json()
            })
            .then(data=>{
                setLibro(data[0])
                setIsLoading(false)
            })
            .catch(error =>{
                console.error("Error al cargar los detalles del libro:",error)
                setIsLoading(false)
            })
    },[{id}])

    if(isLoading){
        return <div>Cargando...</div>
    }
    if(!libro){
        return <div>No se encontro el libro</div>
    }*/

    return(
        <>
        <div>
            <h1>{libro.title}</h1>
            <p>Autor: {libro.author}</p>
            <p>Descripcion: {libro.description}</p>
            <img src={libro.imgUrl[0]} alt={libro.title} />
        </div>

        </>
    )
}
export default DetalleLibro