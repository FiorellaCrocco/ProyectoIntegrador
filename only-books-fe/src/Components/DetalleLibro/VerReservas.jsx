import { useEffect, useState } from "react"

function VerReservas({id, obtenerReservaLibro}){

    const API_URL= import.meta.env.VITE_API_URL
    const url = `${API_URL}bookRent/book/${id}`;
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const [reservas, setReservas] = useState([])

    const fetchDisponibilidad = async () => {
        const settings = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            }
          };
        try {
          const response = await fetch(url,settings);
          if (!response.ok) {
            throw new Error("No se pudo obtener las reservas.");
          }
          const data = await response.json();
          setReservas(data);
        } catch (error) {
          console.error("Error al cargar las reservas:", error);
        }
      };

    useEffect(()=>{
        fetchDisponibilidad()
        console.log("Reenderizando 1")

    },[])

    useEffect(()=>{
        console.log("reenderizando 2")
        obtenerReservaLibro(reservas)
    },[reservas])

    return(
        <>
        </>
    )
}
export default VerReservas