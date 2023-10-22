package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Gender;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

@SpringBootTest

public class BookServiceTest {

    @Autowired
    IBookService bookService;

    @Test
    public void testAgregarBook()throws Exception{

        Date date = new Date();
        Book b = new Book("101 Dalmatas", "Ejemplo autor", "Ejemplo descripcion", "123456", date, 5, Gender.INFANTIL,"ejemplourl.com",15.99);
        System.out.println(b.getId() + b.getTitle());
        Long id = bookService.guardar(b);
        System.out.println(id);
        assertNotNull(id);
    }

}
