package com.proyecto.onlybooks.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.BookSummary;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins="http://localhost:5173")
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

    @Autowired
    private AmazonS3 s3;


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
    // En la url "/book/agregar"
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/agregar")
    public ResponseEntity<?> agregar(@RequestBody Book book) {
        // Extraer otros datos del libro
        String title = book.getTitle();
        String description = book.getDescription();

        // Obtener la lista de imágenes en formato Base64
        List<String> base64Images = (book.getImagesBase64() != null) ? book.getImagesBase64() : Collections.emptyList();

        // Crear una lista para almacenar las entidades Image
        List<Image> images = new ArrayList<>();

        ObjectMetadata objectMetadata = new ObjectMetadata();

        Book newBook = new Book(title, null, description, null, null, null, null);

        Long id = bookService.guardar(newBook);
        newBook.setId(id);

        // Iterar sobre la lista de imágenes y subirlas a S3
        for (String base64Image : base64Images) {
            System.out.println("Base64 Image: " + base64Image);

            // Decodificar el archivo base64
            byte[] binaryData = Base64.getDecoder().decode(base64Image);

            // Generar un nombre de clave único para cada imagen
            String key = title + "_" + UUID.randomUUID().toString() + ".jpg";

            try {
                // Configurar la longitud del contenido en ObjectMetadata
                objectMetadata.setContentLength(binaryData.length);

                // Subir la imagen a S3
                s3.putObject("onlybooksbucket", key, new ByteArrayInputStream(binaryData), objectMetadata);

                // Crear una nueva entidad Image con la URL de la imagen
                Image image = new Image();
                image.setUrl("https://onlybooksbucket.s3.amazonaws.com/" + key);
                image.setBook(newBook);
                images.add(image);
            } catch (IllegalArgumentException | AmazonServiceException e) {
                System.err.println("Error al procesar la imagen " + e.getMessage());
                // Manejar el error apropiadamente (puede ser útil lograrlo o devolver un mensaje más detallado)
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar el libro.");
            }
        }
        // Crear un nuevo libro con la lista de entidades Image

        newBook.setImages(images);

        // Guardar el libro en la base de datos
        bookService.guardar(newBook);

        return ResponseEntity.status(HttpStatus.OK).body("Libro agregado exitosamente.");
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

    // "/{bookId}/caracteristica/{caracteristicaId}"
    @PutMapping("/{bookId}/caracteristica/{caracteristicaId}")
    public ResponseEntity<?> agregarCaracteristica(@PathVariable Long bookId, @PathVariable Long caracteristicaId) throws ResourceNotFoundException{
        ResponseEntity<?> response=null;
        bookService.guardarCaracteristica(bookId,caracteristicaId);
        return response;
    }
    @GetMapping("/listarexpress")
    public List<BookSummary> listarTodosExpress(){
        List<BookSummary> lista = null;
        try{
            lista =bookService.listarTodosExpress();
        }catch (ResourceNotFoundException e){
            System.out.println(e);
        }
        return lista;
    }

}


