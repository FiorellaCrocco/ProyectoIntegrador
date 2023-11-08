//package com.proyecto.onlybooks.service.impl;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Image;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IBookRepository;
import com.proyecto.onlybooks.service.IBookService;
import org.hibernate.internal.util.collections.IdentityMap;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.proyecto.onlybooks.entity.Gender.SUSPENSO;
import static org.junit.jupiter.api.Assertions.*;

//@SpringBootTest
//public class BookServiceTest {
/*

    @Autowired
    IBookService iBookService;
    IBookRepository iBookRepository;


    @Test
    @Transactional
    public void guardar() throws Exception {

        Book book = new Book();
        book.setTitle("Titulo");
        book.setAuthor("Autor");
        book.setDescription("Descripcion");
        book.setIsbn("ISBN");
        book.setPublication_year(new Date(25-10-25));
        book.setQualification(5);
        book.setGender(SUSPENSO);
        book.setPrice(5.0);

        Long bookId = iBookService.guardar(book);

        assertNotNull(book);

    }

    @Test
    @Transactional
    public void mostrarTodos() throws Exception {

        Book book = new Book();
        book.setTitle("Titulo");
        book.setAuthor("Autor");
        book.setDescription("Descripcion");
        book.setIsbn("ISBN");
        book.setPublication_year(new Date(25-10-25));
        book.setQualification(5);
        book.setGender(SUSPENSO);
        book.setPrice(5.0);


        Book book1 = new Book();
        book1.setTitle("Titulo");
        book1.setAuthor("Autor");
        book1.setDescription("Descripcion");
        book1.setIsbn("ISBN");
        book1.setPublication_year(new Date(25-10-25));
        book1.setQualification(5);
        book1.setGender(SUSPENSO);
        book1.setPrice(5.0);


        assertNotNull(iBookService.mostrarTodos());

    }

    @Test
    @Transactional
    public  void buscarPorId() throws Exception {


        Book book = new Book();

        book.setTitle("Titulo");
        book.setAuthor("Autor");
        book.setDescription("Descripcion");
        book.setIsbn("ISBN");
        book.setPublication_year(new Date(25-10-25));
        book.setQualification(5);
        book.setGender(SUSPENSO);
        book.setPrice(5.0);

        Long bookId = iBookService.guardar(book);

        BookDTO resultado = iBookService.buscarPorId(bookId);

        assertEquals(1,1);


    }

    @Test
    @Transactional
    public  void modificar() throws Exception {

        Book book = new Book();

        book.setTitle("Titulo");
        book.setAuthor("Autor");
        book.setDescription("Descripcion");
        book.setIsbn("ISBN");
        book.setPublication_year(new Date(25-10-25));
        book.setQualification(5);
        book.setGender(SUSPENSO);
        book.setPrice(5.0);

        Long bookId = iBookService.guardar(book);

        book.setTitle("Titulo1");

        iBookService.modificar(book);

        BookDTO modificado = iBookService.buscarPorId(bookId);

        assertNotNull(modificado);
        assertEquals("Titulo1",modificado.getTitle());
    }

    @Test
    @Transactional
    public  void eliminar() throws Exception {

        Book book = new Book();

        book.setTitle("Titulo");
        book.setAuthor("Autor");
        book.setDescription("Descripcion");
        book.setIsbn("ISBN");
        book.setPublication_year(new Date(25-10-25));
        book.setQualification(5);
        book.setGender(SUSPENSO);
        book.setPrice(5.0);

        Long bookId = iBookService.guardar(book);


        iBookService.eliminar(bookId);

        assertThrows(ResourceNotFoundException.class, () -> iBookService.buscarPorId(bookId));

    }
*/

    //  @Test
    //  @Transactional
    //  void buscarListaImagenes() throws Exception {
    //     Image image1 = new Image();

    //   List<String> imagenesList= new ArrayList<>();
    //   imagenesList.add("imagen2");
    //   imagenesList.add("iamgen1");

    // Book book = new Book();

    //   book.setTitle("Titulo");
    //   book.setAuthor("Autor");
    //   book.setDescription("Descripcion");
    //   book.setIsbn("ISBN");
    //  book.setPublication_year(new Date(25-10-25));
    //   book.setQualification(5);
    //   book.setGender(SUSPENSO);
    //  book.setPrice(5.0);
    //  image1.setBook(book);
    //  Long bookId = iBookService.guardar(book);

    //   iBookRepository.buscarImages(bookId);

    //   assertNotNull(imagenesList);

    // }
//}