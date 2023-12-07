import { useState, useEffect, createContext } from "react";

export const GlobalContext = createContext();

export const BookProvider = ({ children }) => {
  const [listaLibros, setListaLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRent, setIsLoadingRent] = useState(true);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaResenias, setListaResenias] = useState([]);
  const [listaCaracteristicas, setListaCaracteristicas] = useState([]);
  const [rentBook, setRentBook] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const storedFilters = JSON.parse(sessionStorage.getItem("filtrosSeleccionados")) || [];
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState(storedFilters);
  const [favoritos, setListaFavoritos] = useState([])

  const API_URL = import.meta.env.VITE_API_URL;

  const url = `${API_URL}book/listarexpress`;
  //    const url = "https://onlybooks.isanerd.club/api/book/listarexpress";
  const urlCategorias = `${API_URL}categoria/listar`;
  //   const urlCategorias = "https://onlybooks.isanerd.club/api/categoria/listar";
  const urlCaracteristicas = `${API_URL}caracteristica/listar`;
  //   const urlCaracteristicas = "https://onlybooks.isanerd.club/api/caracteristica/listar";
  const urlFiltro = `${API_URL}bookRent/listar`;
  //   const urlCaracteristicas = "https://onlybooks.isanerd.club/api/bookRent/listar";
  const urlBookId = `${API_URL}book/`;

  const guardarFiltros = (filtro) => {
    if (filtro === "") {
      setFiltrosSeleccionados([]);
    } else {
      if (filtrosSeleccionados.includes(filtro)) {
        setFiltrosSeleccionados((prevFilters) =>
          prevFilters.filter((e) => e !== filtro)
        );
      } else {
        setFiltrosSeleccionados((prevFilters) => [...prevFilters, filtro]);
      }
    }
  };
  useEffect(() => {
    sessionStorage.setItem("filtrosSeleccionados", JSON.stringify(filtrosSeleccionados));
  }, [filtrosSeleccionados]);

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de libros.");
      }
      const data = await response.json();
      setListaLibros(data);
      setIsLoading(false);
      return data;
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
      const response = await fetch(`${urlBookId}${id}`);
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

  const fetchListaFavoritos = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      // console.log(userData)
      if (userData) {
        const userId = userData.id;
        const token = sessionStorage.getItem("token");

        const url = `${API_URL}user/mostrarFav/${userId}`;
        const set = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, set);
        const data = await response.json();

        if (response.ok) {
          console.log("Lista de libros favoritos:", data);
          setListaFavoritos(data)
          console.log(favoritos)
          return data;
        } else {
          throw new Error("Error al realizar la operación");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchObtenerResenias = async (bookId) => {
    const url = `${API_URL}resenia/book/${bookId}`;
    // console.log("FETCH GET RESENIA")

    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(url, settings);
      const data = await response.json();
      setListaResenias(data);
      return data;
    } catch (error) {
      console.error("ERROR: ", error);
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

  const fetchFiltroRent = async () => {
    setIsLoadingRent(true);
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(urlFiltro, settings);
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de RentBooks");
      }
      const data = await response.json();
      setRentBook(data);
      setIsLoadingRent(false);
      // console.log(data)
      return data;
    } catch (error) {
      setIsLoadingRent(false);
      console.error("Error al cargar la lista de RentBooks:", error);
    }
  };

  //  const actualizarCaracteristicas = async () => {
  //  await fetchCaracteristicas();
  //};

  useEffect(() => {
    fetchData();
    fetchCategorias();
    fetchCaracteristicas();
    fetchFiltroRent();
    fetchListaFavoritos();
    //fetchFiltroRent()
  }, []);

  const logout = () => {
    setToken("");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userData");
  };

  return (
    <GlobalContext.Provider
      value={{
        listaCategorias,
        listaLibros,
        isLoading,
        setIsLoading,
        isLoadingRent,
        listaResenias,
        actualizarListaLibros,
        actualizarCategorias,
        fetchBookById,
        logout,
        fetchCaracteristicas,
        listaCaracteristicas,
        fetchFiltroRent,
        rentBook,
        fetchData,
        fetchObtenerResenias,
        fetchListaFavoritos,
        guardarFiltros,
        filtrosSeleccionados,
        favoritos,
        setListaFavoritos,
        storedFilters
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
