package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.BookSummary;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IBookRepository;
import com.proyecto.onlybooks.repository.ICategoriaRepository;
import com.proyecto.onlybooks.repository.IUserRepository;
import com.proyecto.onlybooks.service.IBookService;
import com.proyecto.onlybooks.service.ICaracteristicaService;
import com.proyecto.onlybooks.service.ICategoriaService;
import com.proyecto.onlybooks.service.IUserService;
import jakarta.transaction.Transactional;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService implements IBookService {

    private static final Logger logger = Logger.getLogger(BookService.class);

    // Repositorio de Book utilizado para acceder a la base de datos.
    private final IBookRepository iBookRepository;
    private final ICategoriaService iCategoriaService;
    private final ICaracteristicaService iCaracteristicaService;
    private final IUserRepository iUserRepository;
    private final IUserService iUserService;

    // Para la conversión de objetos.
    private final ObjectMapper objectMapper;

    // Constructor de BookService que permite la inyección de dependencias.
    @Autowired
    public BookService(IBookRepository iBookRepository, ICategoriaService iCategoriaService, ICaracteristicaService iCaracteristicaService, ObjectMapper objectMapper, IUserRepository iUserRepository, IUserService iUserService) {
        this.iBookRepository = iBookRepository;
        this.iCategoriaService = iCategoriaService;
        this.iCaracteristicaService = iCaracteristicaService;
        this.objectMapper = objectMapper;
        this.iUserRepository=iUserRepository;
        this.iUserService=iUserService;
    }

    @Override
    public Long guardar(Book book) throws ResourceNotFoundException {
        logger.info("Libros - guardar: Se va a guardar el libro");
        if(book.getCantResenias()==null){
            book.setCantResenias(0);
            book.setQualification(0d);
        }
        Long id = iBookRepository.save(book).getId();
        /*List<Categoria> lista = book.getCategorias();
        for (Categoria l : lista){
            guardarCategoria(id,l.getId());
        }*/
        return book.getId();
    }

    @Override
    public List<BookDTO> mostrarTodos() throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule());
        List<BookDTO> bookDTOS = iBookRepository.findAll()
                .stream()
                .map(book -> {
                    try {
                        Long id = book.getId();
                        List<String> images = buscarListaImagenes(id);
                        List<Categoria> categorias = buscarCategoria(id);
                        List<Caracteristica> caracteristicas=buscarCaracteristica(id);
                        if (images == null) {
                            throw new ResourceNotFoundException("Imagenes no encontradas.");
                        }
                        BookDTO bookDTO = objectMapper.convertValue(book, BookDTO.class);
                        //bookDTO.setImgUrl(images);
                        bookDTO.setCategorias(categorias);
                        bookDTO.setCaracteristicas(caracteristicas);
                        return bookDTO;
                    } catch (ResourceNotFoundException e) {
                        // Maneja la excepción aquí o regresa un valor por defecto si lo prefieres.
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return bookDTOS;
    }

    @Override
    public BookDTO buscarPorId(Long id) throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        Optional<Book> found = iBookRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o Book
        if (found.isPresent()) {  // Evaluamos si found tiene contenido
            Book b = found.get();
            logger.info("Libro - buscarPorId: Se encontro el libro y se convertira a DTO para ser devuelto");
            List<String> images = buscarListaImagenes(id);
            List<Categoria> categorias = buscarCategoria(id);
            List<Caracteristica> caracteristicas=buscarCaracteristica(id);
            BookDTO bookDTO = objectMapper.convertValue(found, BookDTO.class);  // Convertimos a found que es de tipo Book a BookDTO.
            bookDTO.setListImgUrl(images);
            bookDTO.setCategorias(categorias);
            bookDTO.setCaracteristicas(caracteristicas);
            return bookDTO;
        } else {
            logger.warn("Libro - buscarPorId: No se encontro ningun libro con ese ID");
            throw new ResourceNotFoundException("El libro no existe");
        }
    }

    @Override
    public void modificar(Book book) throws ResourceNotFoundException {
        logger.info("Libro - actualizar: Se va a actualizar el libro");
        guardar(book); // El método utiliza .save; este lo que hace es crear si el ID = 0 pero si ID!=0 actualiza los cambios.
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        System.out.println("DENTRO DE ELIMINAR LIBRO");
        Optional<Book> found = iBookRepository.findById(id);
        if (found.isPresent()) {
            eliminarTodosLosFavoritos(id);
            //iBookRepository.deleteById(id);
            logger.warn("Libro - eliminar: Se ha eliminado el libro");
        } else {
            logger.error("No se ha encontrado el libro con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado el libro");
        }
    }

    public List<String> buscarListaImagenes(Long id) throws ResourceNotFoundException {
        List<String> lista = iBookRepository.buscarImages(id);
        if (lista != null) {
            return lista;
        } else {
            throw new ResourceNotFoundException("No se encontraron imagenes para el libro con id: " + id);
        }
    }
    public List<Categoria> buscarCategoria(Long id) throws ResourceNotFoundException{
        List<Categoria> lista = iBookRepository.buscarCategoriaByBookId(id);
        if(lista!=null){
            return lista;
        }else{
            throw new ResourceNotFoundException("No se encontraron categorias.");
        }
    }
    public List<Caracteristica> buscarCaracteristica(Long id) throws ResourceNotFoundException{
        List<Caracteristica> lista = iBookRepository.buscarCaracteristicaByBookId(id);
        if(lista!=null){
            return lista;
        }else{
            throw new ResourceNotFoundException("No se encontraron categorias.");
        }
    }
    public Book buscarPorId2(Long id) throws  ResourceNotFoundException {
        Optional<Book> found = iBookRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o Book
        if (found.isPresent()) {  // Evaluamos si found tiene contenido
            Book b = found.get();
            List<Categoria> categorias = buscarCategoria(id);
            List<Caracteristica> caracteristicas = buscarCaracteristica(id);
            b.setCategorias(categorias);
            b.setCaracteristicas(caracteristicas);
            return b;
        } else {
            logger.warn("Libro - buscarPorId: No se encontro ningun libro con ese ID");
            throw new ResourceNotFoundException("El libro no existe");
        }
    }
    public void guardarCategoria(Long bookId, Long categoriaId) throws ResourceNotFoundException{
        Book b = this.buscarPorId2(bookId);
        Categoria c = iCategoriaService.buscarPorId(categoriaId);
        List<Categoria> lista = b.getCategorias();
        lista.add(c);
        b.setCategorias(lista);
        this.guardar(b);
    }

    public void guardarCaracteristica(Long bookId, Long caracteristicaId) throws ResourceNotFoundException{
        Book b = this.buscarPorId2(bookId);
        Caracteristica c = iCaracteristicaService.buscarPorId(caracteristicaId);
        List<Caracteristica> lista = b.getCaracteristicas();
        lista.add(c);
        b.setCaracteristicas(lista);
        this.guardar(b);
    }

    public List<BookSummary> listarTodosExpress() throws ResourceNotFoundException{

        List<BookSummary> lista = iBookRepository.findLibroSummary();
        for(BookSummary b : lista){
            b.setCategorias(iBookRepository.buscarCategoriaByBookId(b.getId()));
            /*
            List<String> listaImagenes = iBookRepository.buscarImages(b.getId());
            String imagen = listaImagenes.stream().findFirst().orElse(null);
            b.setImgUrl(imagen);*/
        }
        return lista;
    }

    public void eliminarTodosLosFavoritos(Long bookId) throws ResourceNotFoundException {
        System.out.println("ELIMINANDO FAVORITOS");
        List<User> listUser = iUserRepository.buscarBooksFavoritos(bookId);

        for(User u : listUser){
            System.out.println("USUARIO");

            iUserService.eliminarFavorito(u.getId(),bookId);
        }
        iBookRepository.deleteById(bookId);
    }
}
