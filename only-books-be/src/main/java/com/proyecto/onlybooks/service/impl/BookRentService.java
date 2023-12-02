package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.BookRentDTO;
import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IBookRentRepository;
import com.proyecto.onlybooks.service.IBookRentService;
import com.proyecto.onlybooks.service.IBookService;
import com.proyecto.onlybooks.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookRentService implements IBookRentService {


    private static final Logger logger = Logger.getLogger(BookRent.class);

    // Repositorio de BookRent utilizado para acceder a la base de datos.
    private IBookRentRepository iBookRentRepository;
    private IUserService iUserService;
    private IBookService iBookService;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de BookRentService que permite la inyección de dependencias.
    public BookRentService(IBookRentRepository iBookRentRepository, ObjectMapper objectMapper, IUserService iUserService, IBookService iBookService) {
        this.iBookRentRepository = iBookRentRepository;
        this.objectMapper = objectMapper;
        this.iUserService= iUserService;
        this.iBookService=iBookService;
    }
    @Override
    public Long guardar(BookRent bookRent) throws ResourceNotFoundException {
        Long userId = bookRent.getUser().getId();
        Long bookId = bookRent.getBook().getId();
        UserDTO u = iUserService.buscarPorId(userId);
        BookDTO b = iBookService.buscarPorId(bookId);
        objectMapper.registerModule(new JavaTimeModule());
        User usuario = objectMapper.convertValue(u,User.class);
        Book book = objectMapper.convertValue(b, Book.class);
        bookRent.setBook(book);
        bookRent.setUser(usuario);

        LocalDate fechaInicio =bookRent.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate fechaFin = bookRent.getReturnDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        fechaInicio=fechaInicio.plusDays(1);
        fechaFin=fechaFin.plusDays(1);
        Date inicioFormateado = Date.from(fechaInicio.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date finFormateado = Date.from(fechaFin.atStartOfDay(ZoneId.systemDefault()).toInstant());

        bookRent.setStartDate(inicioFormateado);
        bookRent.setReturnDate(finFormateado);

        iBookRentRepository.save(bookRent);
        return bookRent.getId();
    }

    @Override
    public List<BookRent> mostrarTodos() {
        // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        List<BookRent> bookRent = new ArrayList<>();  // Creamos un ArrayList de tipo BookRentDTOS
        for (BookRent p : iBookRentRepository.findAll()){    // Iteramos el array
            logger.info("Libro prestamo - buscarTodos: Se esta iterando el array de libros");
            bookRent.add(p);
  // En cada iteración convertimos el objeto de tipo BookRent a BookRentDTOS y lo agregamos al ArrayList
        }
        for(BookRent p : bookRent){
            System.out.println(p.getBook().getTitle());
            System.out.println(p.getUser().getName());
        }
        return bookRent;
    }

    @Override
    public BookRent buscarPorId(Long id) throws ResourceNotFoundException {
        Optional<BookRent> found = iBookRentRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o BookRent
        if(found.isPresent()) {  // Evaluamos si found tiene contenido
            logger.info("Libro prestamo - buscarPorId: Se encontro el libro y se convertira a DTO para ser devuelto");
            return found.get(); // Convertimos a found que es de tipo BookRent a BookRentDTO.
        } else {
            logger.warn("Libro prestamo - buscarPorId: No se encontro ningun libro prestamo con ese ID");
            throw new ResourceNotFoundException("El libro prestamo no existe");
        }
    }

    @Override
    public void modificar(BookRent bookRent) throws ResourceNotFoundException {
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

    public List<BookRent> buscarRentaPorUserId(Long userId) throws ResourceNotFoundException{
        List<BookRent> lista = iBookRentRepository.buscarRentaPorUserId(userId);
        return lista;
    }

    public List<BookRent> buscarRentaPorBookId(Long bookId) throws ResourceNotFoundException{
        List<BookRent> lista = iBookRentRepository.buscarRentaPorBookId(bookId);
        return lista;
    }


}
