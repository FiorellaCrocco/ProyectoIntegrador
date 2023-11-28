import React from 'react'

const Historial = () => {
// Reemplaza {id} con tu ID de usuario
const userId = "tu_id_de_usuario";

// Construye la URL con el ID de usuario
const url = `https://onlybooks.isanerd.club/bookRent/user/${userId}`;

// Realiza la solicitud fetch
fetch(url)
  .then(response => {
    // Verifica si la respuesta es exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error al realizar la solicitud: ${response.status}`);
    }
    
    // Parsea la respuesta como JSON
    return response.json();
  })
  .then(data => {
    // Maneja los datos obtenidos
    console.log("Lista de libros reservados:", data);
    // Aquí puedes realizar otras operaciones con la lista de libros reservados
  })
  .catch(error => {
    console.error("Error en la solicitud:", error);
  });
}

export default Historial