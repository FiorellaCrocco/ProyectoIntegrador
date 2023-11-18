package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.entity.Resenia;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IReseniaService {
    Long guardar(Resenia resenia) throws ResourceNotFoundException;
    List<Resenia> mostrarTodos() throws ResourceNotFoundException;
    Resenia buscarPorId(Long id) throws ResourceNotFoundException;
    void modificar(Resenia resenia) throws ResourceNotFoundException;
    void eliminar(Long id) throws ResourceNotFoundException;
    List<Resenia> buscarReseniaPorBookId(Long id) throws ResourceNotFoundException;
}
