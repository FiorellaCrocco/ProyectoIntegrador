package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.ICategoriaService;
import com.proyecto.onlybooks.service.impl.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    private ICategoriaService iCategoriaService;

    // Constructor de BookController que permite la inyección de dependencias.
    public BookController(BookService bookService, ICategoriaService iCategoriaService) {
        this.bookService = bookService;
        this.iCategoriaService=iCategoriaService;
    }

    // En la url "/book/listar" retorno una lista de BookDTO
    @GetMapping("/listar")
    public List<BookDTO> buscarBooks() throws Exception{
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
    // En la url "/book/{bookId}/categoria/{categoriaId]" utilizamos el metodo PUT para EDITAR un libro, y agregarle una categoria existente(categoriaID)
    @PutMapping("/{bookId}/categoria/{categoriaId}")
    public ResponseEntity<?> agregarCategoria(@PathVariable Long bookId, @PathVariable Long categoriaId) throws ResourceNotFoundException{
        ResponseEntity<?> response=null;
        bookService.guardarCategoria(bookId,categoriaId);
        return response;
    }

}


