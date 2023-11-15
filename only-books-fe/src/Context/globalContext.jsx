import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const BookProvider = ({ children }) => {

  const [listaLibros, setListaLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);
  const [rentBook, setRentBook] = useState([])
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');


const url = "http://localhost:8080/book/listarexpress";
//    const url = "https://onlybooks.isanerd.club/api/book/listarexpress";
 const urlCategorias = "http://localhost:8080/categoria/listar";
//   const urlCategorias = "https://onlybooks.isanerd.club/api/categoria/listar";
const urlCaracteristicas = "http://localhost:8080/caracteristica/listar";
//   const urlCaracteristicas = "https://onlybooks.isanerd.club/api/caracteristica/listar";
const urlFiltro= "http://localhost:8080/bookRent/listar"
//   const urlCaracteristicas = "https://onlybooks.isanerd.club/api/bookRent/listar";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de libros.");
      }
      const data = await response.json();
      setListaLibros(data);
      setIsLoading(false);
      return data
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
      setIsLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await fetch(urlCategorias);
      if (!response.ok) {
        throw new Error("No se pudo obtener las categorias.");
      }
      const data = await response.json();
      setListaCategorias(data);
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
    }
  };

  const fetchCaracteristicas = async () => {
    try {
      const response = await fetch(urlCaracteristicas);
      if (!response.ok) {
        throw new Error("No se pudo obtener las caracteristicas.");
      }
      const data = await response.json();
      setListaCaracteristicas(data);
    } catch (error) {
      
      console.error("Error al cargar las caracteristicas:", error);
    }
  };


  const fetchBookById = async (id) => {
    try {
       const response = await fetch(`http://localhost:8080/book/${id}`);
    //  const response = await fetch(`https://onlybooks.isanerd.club/api/book/${id}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el libro.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al cargar el libro:", error);
      return null;
    }
  };

  const actualizarListaLibros = async () => {
    // Lógica para actualizar la lista después de realizar operaciones
    // por ejemplo, puedes llamar a la función fetchData nuevamente
    await fetchData();
  };

  const actualizarCategorias = async () => {
    await fetchCategorias();
  };



  const fetchFiltroRent= async()=>{
    const settings = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    };
    try {
      const response = await fetch(urlFiltro,settings);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de RentBooks");
      }
      const data = await response.json();
      setRentBook(data);
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error al cargar la lista de RentBooks:", error);
    }
  }

//  const actualizarCaracteristicas = async () => {
//  await fetchCaracteristicas();
//};

  useEffect(() => {
    fetchData();
    fetchCategorias();
    fetchCaracteristicas();
    fetchFiltroRent()
  }, []);



  const logout = () => {
    setToken('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');

  };


  return (
    <GlobalContext.Provider value={{ listaCategorias, listaLibros, isLoading, actualizarListaLibros, actualizarCategorias, fetchBookById, logout, fetchCaracteristicas, listaCaracteristicas, fetchFiltroRent, rentBook,fetchData }}>
      {children}
    </GlobalContext.Provider>
  );
};
