package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;


public interface ICategoriaService {
    Long guardar(Categoria categoria);
    List<Categoria> mostrarTodos() throws ResourceNotFoundException;
    Categoria buscarPorId(Long id) throws ResourceNotFoundException;
    void modificar(Categoria categoria) ;
    void eliminar(Long id) throws ResourceNotFoundException;
}
