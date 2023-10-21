package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/book")
public class BookController {

    BookService bookService;

    // Constructor de BookController que permite la inyección de dependencias.
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // En la url "/book/listar" retorno una lista de BookDTO
    @GetMapping("/listar")
    public List<BookDTO> buscarBooks() {
        List<BookDTO> listarBooks = bookService.mostrarTodos();
        return listarBooks;
    }

    // En la url "/book/{id}" retorno el BookDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> buscarUnBook(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(bookService.buscarPorId(id));
    }

    // En la url "/book/agregar" hacemos un POST para guardar el book
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarBook(@RequestBody Book book) {
        bookService.guardar(book);
        return ResponseEntity.status(HttpStatus.OK).body(book.getId());
    }

    // En la url "/book/modificar" actualizamos un book ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnBook(@RequestBody Book book) {
        bookService.modificar(book);
        return ResponseEntity.ok().body("Se modifico el Libro.");
    }

    // En la url "/book/eliminar/{id}" utilizamos el metodo DELETE para eliminar un book segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarBook(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        bookService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Libro eliminado.");
        return response;
    }

}


