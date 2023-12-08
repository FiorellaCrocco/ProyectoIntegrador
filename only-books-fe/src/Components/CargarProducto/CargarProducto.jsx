import { useContext, useState } from "react";
import "./CargarProducto.css";
import { GlobalContext } from "../../Context/globalContext";
import Swal from "sweetalert2";

function CargarProducto() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { fetchData, listaCategorias, listaCaracteristicas } =
    useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCaracteristica, setSelectedCaracteristica] = useState([]);

  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    isbn: "",
    publication_year: "2023-11-03",
    qualification: 0,
    price: 0,
    imagesBase64: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const base64Array = [];

    for (const file of files) {
      const base64Data = await readFileAsBase64(file);
      base64Array.push(base64Data);
    }

    setFormData((prevData) => {
      return {
        ...prevData,
        imagesBase64: base64Array,
      };
    });
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Obtener la cadena Base64 sin el prefijo
        const base64WithoutPrefix = reader.result.split(",")[1];
        resolve(base64WithoutPrefix);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listaLibros = await fetchData();
    const librosFormateados = listaLibros.map((book) =>
      book.title.toLowerCase()
    );
    const tituloNuevo = formData.title.toLowerCase();

    if (librosFormateados.includes(tituloNuevo)) {
      Swal.fire({
        text: "Error: el titulo del libro ya existe.",
        icon: "error",
      });
    } else {
      const url = `${API_URL}book/agregar`;
      //   const url = "https://onlybooks.isanerd.club/api/book/agregar";
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };

      Swal.fire({
        title: "Agregando libro...",
        icon: "info",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            const response = await fetch(url, settings);
            const data = await response.text();
            console.log(data);

            for (const category of selectedCategory) {
              await fetchCategoria(data, category.id);
            }
            for (const caracteristica of selectedCaracteristica) {
              await fetchCaracteristica(data, caracteristica.id);
            }
            // Mensaje de éxito
            Swal.fire({
              text: "Libro cargado con éxito",
              icon: "success",
            });
            // Limpiar los campos del formulario
            setFormData({
              id: 0,
              title: "",
              author: "",
              description: "",
              isbn: "",
              publication_year: "2023-11-03",
              qualification: 0,
              price: 0,
              imagesBase64: [],
            });

            // Actualizar la lista de libros después de la carga exitosa
            await fetchData();
          } catch (error) {
            console.log(error);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
    }
  }
    async function fetchCategoria(bookId, categoriaId) {
      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${API_URL}book/${bookId}/categoria/${categoriaId}`;
      //   const url = `https://onlybooks.isanerd.club/api/book/${bookId}/categoria/${categoriaId}`;
      try {
        const response = await fetch(url, settings);
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    async function fetchCaracteristica(bookId, caracteristicaId) {
      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${API_URL}book/${bookId}/caracteristica/${caracteristicaId}`;
      //    const url = `https://onlybooks.isanerd.club/api/book/${bookId}/caracteristica/${caracteristicaId}`;
      try {
        const response = await fetch(url, settings);
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    }

    const renderCategoryOptions = () => {
      const categorias = listaCategorias;
      return categorias.map((category, index) => (
        <div
          key={index}
          className={`${selectedCategory.includes(category) ? "selected" : ""}`}
          onClick={() => handleCategoryChange(category)}
        >
          <label value={category}>{category.titulo}</label>
        </div>
      ));
    };

    const renderCaracteristicasOptions = () => {
      const caracteristicas = listaCaracteristicas;
      return caracteristicas.map((caracteristica, index) => (
        <div
          key={index}
          className={`${
            selectedCaracteristica.includes(caracteristica) ? "selected" : ""
          }`}
          onClick={() => handleCaracteristicaChange(caracteristica)}
        >
          <label value={caracteristica}>
            {caracteristica.title.toUpperCase()}
          </label>
        </div>
      ));
    };

    const handleCategoryChange = (category) => {
      if (selectedCategory.includes(category)) {
        setSelectedCategory(
          selectedCategory.filter((c) => c.titulo !== category.titulo)
        );
      } else {
        setSelectedCategory([...selectedCategory, category]);
      }
    };

    const handleCaracteristicaChange = (caracteristica) => {
      if (selectedCaracteristica.includes(caracteristica)) {
        setSelectedCaracteristica(
          selectedCaracteristica.filter((c) => c.title !== caracteristica.title)
        );
      } else {
        setSelectedCaracteristica([...selectedCaracteristica, caracteristica]);
      }
    };
    window.scrollTo(0,0)

    return (
      <div>
        <h2 className="titulo">Crear Libro</h2>
        <div className="Container">
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="div">
              <label className="labels" htmlFor="title">
                Título:
              </label>
              <input
                className="input_CrearProducto"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="author">
                Autor:
              </label>
              <input
                className="input_CrearProducto"
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="description">
                Descripción:
              </label>
              <textarea
                className="input_CrearProducto"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="isbn">
                ISBN:
              </label>
              <input
                className="input_CrearProducto"
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
              />
            </div>
            <div className="div">
              <label className="labels" htmlFor="publication_year">
                Año de Publicación:
              </label>
              <input
                className="input_CrearProducto"
                type="date"
                id="publication_year"
                name="publication_year"
                value={formData.publication_year}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="div">
          <label className="labels" htmlFor="qualification">
            Calificación:
          </label>
          <input
            className="input"
            type="number"
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
          />
        </div> */}
            <div className="div">
              <label className="labels" htmlFor="price">
                Precio:
              </label>
              <input
                className="input_CrearProducto"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="ccSelect">
              <div className="divSelect">
                <label className="labels" htmlFor="categorias">
                  Categorías:
                </label>
                <>{renderCategoryOptions()}</>
              </div>

              <div className="divSelect">
                <label className="labels" htmlFor="caracteristicas">
                  Características:
                </label>
                <>{renderCaracteristicasOptions()}</>
              </div>
            </div>

            <div className="div">
              <label className="labels" htmlFor="image">
                Imagen:
              </label>
              <input
                className="input_CrearProducto"
                type="file"
                multiple
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button className="FormBtn" type="submit">
              Guardar Libro
            </button>
          </form>
        </div>
      </div>
    );
}
export default CargarProducto;
