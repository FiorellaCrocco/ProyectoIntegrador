package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.BookRentDTO;
import com.proyecto.onlybooks.entity.BookRent;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IBookRentService {

        Long guardar(BookRent bookRent) throws ResourceNotFoundException;
        List<BookRent> mostrarTodos();
        BookRent buscarPorId(Long id) throws ResourceNotFoundException;
        void modificar(BookRent bookRent) throws ResourceNotFoundException;
        void eliminar(Long id) throws ResourceNotFoundException;

}
