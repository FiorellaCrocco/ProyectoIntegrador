import React, { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const BookProvider = ({ children }) => {
  const [listaLibros, setListaLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = "http://localhost:8080/book/listar";

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={{ listaLibros, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};
