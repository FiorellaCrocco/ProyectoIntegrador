package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.BookRentDTO;
import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.BookRentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookRent")
public class BookRentController {

    BookRentService bookRentService;

    // Constructor de BookRentController que permite la inyección de dependencias.
    public BookRentController(BookRentService bookRentService) {
        this.bookRentService = bookRentService;
    }

    // En la url "/bookRent/listar" retorno una lista de booksRentDTO
    @GetMapping("/listar")
    public List<BookRentDTO> buscarBooksRents() {
        List<BookRentDTO> listarBookRents = bookRentService.mostrarTodos();
        return listarBookRents;
    }
    // En la url "/bookRent/{id}" retorno el booksRentDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<BookRentDTO> buscarUnBookRent(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(bookRentService.buscarPorId(id));
    }

    // En la url "/bookRent/agregar" hacemos un POST para guardar el bookRent
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarBookRent(@RequestBody BookRent bookRent) {
        bookRentService.guardar(bookRent);
        return ResponseEntity.status(HttpStatus.OK).body(bookRent.getId());
    }

    // En la url "/bookRent/modificar" actualizamos un bookRent ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnBookRent(@RequestBody BookRent bookRent) {
        bookRentService.modificar(bookRent);
        return ResponseEntity.ok().body("Se modifico el bookRent.");
    }

    // En la url "/bookRent/eliminar/{id}" utilizamos el metodo DELETE para eliminar un bookRent segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarBookRent(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        bookRentService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("BookRent eliminado.");
        return response;
    }
}
