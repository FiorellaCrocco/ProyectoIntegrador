import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext()

export function BookProvider ({children}){
    const [listaLibros, setListaLibros] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const url = "http://localhost:8080/book/listar"

    useEffect(()=>{
        const config ={
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            }
        }
        fetch(url,config)
            .then(response=>{
                if(!response.ok){
                    throw new Error('No se encuentra el libro.')
                }
                return response.json()
            })
            .then(data=>{
                console.log(data)
                setListaLibros(data)
                setIsLoading(false)
            })
            .catch(error =>{
                console.error("Error al cargar los detalles del libro:",error)
                setIsLoading(false)
            })
    },[])

    if(isLoading){
        return <div>Cargando...</div>
    }
    if(!listaLibros){
        return <div>No se encontro el libro</div>
    }

    return (
        <>
        <GlobalContext.Provider value={listaLibros}>
            {children}
        </GlobalContext.Provider>
        </>
    )

}