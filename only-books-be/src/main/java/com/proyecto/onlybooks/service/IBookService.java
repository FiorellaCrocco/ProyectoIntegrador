package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IBookService {
    public interface IUserService {
        void guardar(Book book);
        BookDTO buscarPorId(Long id) throws ResourceNotFoundException;
        void modificar(Book book) throws ResourceNotFoundException;
        void eliminar(Long id) throws ResourceNotFoundException;
        List<BookDTO> mostrarTodos();
    }

}
