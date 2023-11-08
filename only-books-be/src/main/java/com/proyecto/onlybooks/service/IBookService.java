package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.BookSummary;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IBookService {

        Long guardar(Book book) throws ResourceNotFoundException;
        List<BookDTO> mostrarTodos() throws ResourceNotFoundException;
        BookDTO buscarPorId(Long id) throws ResourceNotFoundException;
        void modificar(Book book) throws ResourceNotFoundException;
        void eliminar(Long id) throws ResourceNotFoundException;
        List<BookSummary> listarTodosExpress() throws ResourceNotFoundException;

        //List<String> buscarListaImagenes(Long id) throws ResourceNotFoundException;
}
