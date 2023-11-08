import { useContext, useState } from "react";
import "./CargarProducto.css";
import { GlobalContext } from "../../Context/globalContext";

function CargarProducto() {
  const {
    actualizarListaLibros,
    listaCategorias,
    listaCaracteristicas,
    actualizarCategorias,
  } = useContext(GlobalContext);
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

    const url = "http://localhost:8080/book/agregar";
    // const url = "https://onlybooks.isanerd.club/api/book/agregar";
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    };

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
      await actualizarListaLibros();
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchCategoria(bookId, categoriaId) {
    const settings = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `http://localhost:8080/book/${bookId}/categoria/${categoriaId}`;
    // const url = "https://onlybooks.isanerd.club/api/book/${bookId}/categoria/${categoriaId}";
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
    const url = `http://localhost:8080/book/${bookId}/caracteristica/${caracteristicaId}`;
     // const url = "https://onlybooks.isanerd.club/api/book/${bookId}/caracteristica/${caracteristicaId}";
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

  return (
    <div className="Container">
      <h1 className="titulo">Cargar Libro</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="div">
          <label className="labels" htmlFor="title">
            Título:
          </label>
          <input
            className="input"
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
            className="input"
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
            className="input"
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
            className="input"
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
          />
        </div>
        <div className="div">
          <label className="labels" htmlFor="publication_year">
            Año de Publicación (formato: YYYY-MM-DD):
          </label>
          <input
            className="input"
            type="date"
            id="publication_year"
            name="publication_year"
            value={formData.publication_year}
            onChange={handleInputChange}
          />
        </div>
        <div className="div">
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
        </div>
        <div className="div">
          <label className="labels" htmlFor="price">
            Precio:
          </label>
          <input
            className="input"
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
            className="input"
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
  );
}

export default CargarProducto;
