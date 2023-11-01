package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Image;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.ICaracteristicaService;
import com.proyecto.onlybooks.service.ICategoriaService;
import com.proyecto.onlybooks.service.IImageService;
import com.proyecto.onlybooks.service.impl.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    private ICategoriaService iCategoriaService;

    @Autowired
    private ICaracteristicaService iCaracteristicaService;

    @Autowired
    private IImageService iImageService;

    // Constructor de BookController que permite la inyección de dependencias.
    public BookController(BookService bookService, ICategoriaService iCategoriaService, ICaracteristicaService iCaracteristicaService, IImageService iImageService) {
        this.bookService = bookService;
        this.iCategoriaService = iCategoriaService;
        this.iCaracteristicaService = iCaracteristicaService;
        this.iImageService = iImageService;
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

    /*
    public ResponseEntity<?> agregarBook(@RequestBody Book bookRequest) {
        try {
            // Guardar el libro
            Book book = new Book();
            book.setTitle(bookRequest.getTitle());
            book.setDescription(bookRequest.getDescription());
            bookService.guardar(book);

            // Crear y guardar las imágenes asociadas al libro
            List<Image> images = bookRequest.getImages().stream()
                    .map(imageUrl -> {
                        Image image = new Image();
                        image.setUrl(imageUrl.toString());
                        image.setBook(book);
                        return image;
                    })
                    .collect(Collectors.toList());

            iImageService.guardarTodas(images);

            // Actualizar las imágenes en el libro
            book.setImages(images);
            bookService.guardar(book);

            return ResponseEntity.status(HttpStatus.OK).body(book.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar el libro");
        }
    }*/

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

    @PutMapping("/{bookId}/caracteristica/{caracteristicaId}")
    public ResponseEntity<?> agregarCaracteristica(@PathVariable Long bookId, @PathVariable Long caracteristicaId) throws ResourceNotFoundException{
        ResponseEntity<?> response=null;
        bookService.guardarCaracteristica(bookId,caracteristicaId);
        return response;
    }

}


