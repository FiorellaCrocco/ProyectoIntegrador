package com.proyecto.onlybooks.service;


import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ICaracteristicaService {
    Long guardar(Caracteristica caracteristica);
    List<Caracteristica> mostrarTodos() throws ResourceNotFoundException;
    Caracteristica buscarPorId(Long id) throws ResourceNotFoundException;
    void modificar(Caracteristica caracteristica) ;
    void eliminar(Long id) throws ResourceNotFoundException;
}
