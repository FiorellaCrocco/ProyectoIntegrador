import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const BookProvider = ({ children }) => {
  const [listaCategorias, setListaCategorias] = useState([])
  const [listaLibros, setListaLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = "http://localhost:8080/book/listar";
  //const url = "https://onlybooks.isanerd.club/api/book/listar";
  
  const urlCategorias = "http://localhost:8080/categoria/listar";
  //const urlCategorias = "https://onlybooks.isanerd.club/api/categoria/listar";

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de libros.");
      }
      const data = await response.json();
      setListaLibros(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar la lista de libros:", error);
      setIsLoading(false);
    }
  };

  const actualizarListaLibros = async () => {
    // Lógica para actualizar la lista después de realizar operaciones
    // por ejemplo, puedes llamar a la función fetchData nuevamente
    await fetchData();
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

  useEffect(() => {
    fetchData();
    fetchCategorias();
  }, []);


  return (
    <GlobalContext.Provider value={{ listaLibros, isLoading, actualizarListaLibros, listaCategorias }}>
      {children}
    </GlobalContext.Provider>
  );
};
