package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.BookRentDTO;
import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IBookRentRepository;
import com.proyecto.onlybooks.service.IBookRentService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookRentService implements IBookRentService {


    private static final Logger logger = Logger.getLogger(BookRent.class);

    // Repositorio de BookRent utilizado para acceder a la base de datos.
    private IBookRentRepository iBookRentRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de BookRentService que permite la inyección de dependencias.
    public BookRentService(IBookRentRepository iBookRentRepository, ObjectMapper objectMapper) {
        this.iBookRentRepository = iBookRentRepository;
        this.objectMapper = objectMapper;
    }
    @Override
    public Long guardar(BookRent bookRent) {
        logger.info("Libros prestamo - guardar: Se va a guardar el libro");
        iBookRentRepository.save(bookRent);
        return bookRent.getId();
    }

    @Override
    public List<BookRentDTO> mostrarTodos() {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        List<BookRentDTO> bookRentDTOS = new ArrayList<>();  // Creamos un ArrayList de tipo BookRentDTOS
        for (BookRent p : iBookRentRepository.findAll()){    // Iteramos el array
            logger.info("Libro prestamo - buscarTodos: Se esta iterando el array de libros");
            bookRentDTOS.add(objectMapper.convertValue(p,BookRentDTO.class));  // En cada iteración convertimos el objeto de tipo BookRent a BookRentDTOS y lo agregamos al ArrayList
        }
        return bookRentDTOS;
    }

    @Override
    public BookRentDTO buscarPorId(Long id) throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        Optional<BookRent> found = iBookRentRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o BookRent
        if(found.isPresent()) {  // Evaluamos si found tiene contenido
            logger.info("Libro prestamo - buscarPorId: Se encontro el libro y se convertira a DTO para ser devuelto");
            return objectMapper.convertValue(found, BookRentDTO.class);  // Convertimos a found que es de tipo BookRent a BookRentDTO.
        } else {
            logger.warn("Libro prestamo - buscarPorId: No se encontro ningun libro prestamo con ese ID");
            throw new ResourceNotFoundException("El libro prestamo no existe");
        }
    }

    @Override
    public void modificar(BookRent bookRent){
        logger.info("Libro prestamo - actualizar: Se va a actualizar el libro prestamo");
        guardar(bookRent); // El método utiliza .save; este lo que hace es crear si el ID = 0 pero si ID!=0 actualiza los cambios.
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<BookRent> found = iBookRentRepository.findById(id);
        if(found.isPresent()){
            iBookRentRepository.deleteById(id);
            logger.warn("Libro prestamo - eliminar: Se ha eliminado el libro");
        } else {
            logger.error("No se ha encontrado el libro prestamo con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado el libro prestamo");
        }
    }
}
