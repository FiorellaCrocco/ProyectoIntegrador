import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext()

export function BookProvider ({children}){
    const [listaLibros, setListaLibros] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const url = "https://onlybooks.isanerd.club/api/book/listar"
    
    /*
    useEffect(()=>{
        const storedData = localStorage.getItem('bookList')
        if(storedData){
            setListaLibros(JSON.parse(storedData))
            setIsLoading(false)
        }else{
            const config ={
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            fetch(url)
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
        }
    },[])

    if(isLoading){
        return <div>Cargando...</div>
    }
    if(!listaLibros){
        return <div>No se encontro el libro</div>
    }*/

    return (
        <>
        <GlobalContext.Provider value={listaLibros}>
            {children}
        </GlobalContext.Provider>
        </>
    )

}