package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IBookRepository;
import com.proyecto.onlybooks.service.IBookService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService implements IBookService {

    private static final Logger logger = Logger.getLogger(BookService.class);

    // Repositorio de Book utilizado para acceder a la base de datos.
    private IBookRepository iBookRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de BookService que permite la inyección de dependencias.
    public BookService(IBookRepository iBookRepository, ObjectMapper objectMapper) {
        this.iBookRepository = iBookRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Long guardar(Book book) {
        logger.info("Libros - guardar: Se va a guardar el libro");
        iBookRepository.save(book);
        return book.getId();
    }

    @Override
    public List<BookDTO> mostrarTodos() {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        List<BookDTO> bookDTOS = new ArrayList<>();  // Creamos un ArrayList de tipo BookDTO
        for (Book p : iBookRepository.findAll()){    // Iteramos el array
            logger.info("Libro - buscarTodos: Se esta iterando el array de libros");
            bookDTOS.add(objectMapper.convertValue(p,BookDTO.class));  // En cada iteración convertimos el objeto de tipo Book a BookDTO y lo agregamos al ArrayList
        }
        return bookDTOS;
    }

    @Override
    public BookDTO buscarPorId(Long id) throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        Optional<Book> found = iBookRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o Book
        if(found.isPresent()) {  // Evaluamos si found tiene contenido
            logger.info("Libro - buscarPorId: Se encontro el libro y se convertira a DTO para ser devuelto");
            return objectMapper.convertValue(found, BookDTO.class);  // Convertimos a found que es de tipo Book a BookDTO.
        } else {
            logger.warn("Libro - buscarPorId: No se encontro ningun libro con ese ID");
            throw new ResourceNotFoundException("El libro no existe");
        }
    }

    @Override
    public void modificar(Book book) {
        logger.info("Libro - actualizar: Se va a actualizar el libro");
        guardar(book); // El método utiliza .save; este lo que hace es crear si el ID = 0 pero si ID!=0 actualiza los cambios.
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Book> found = iBookRepository.findById(id);
        if(found.isPresent()){
            iBookRepository.deleteById(id);
            logger.warn("Libro - eliminar: Se ha eliminado el libro");
        } else {
            logger.error("No se ha encontrado el libro con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado el libro");
        }
    }
}
