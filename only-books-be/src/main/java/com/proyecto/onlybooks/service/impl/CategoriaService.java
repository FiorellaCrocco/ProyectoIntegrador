package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.ICategoriaRepository;
import com.proyecto.onlybooks.service.ICategoriaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService implements ICategoriaService {

    private static final Logger logger = Logger.getLogger(User.class);

    // Repositorio de User utilizado para acceder a la base de datos.
    private final ICategoriaRepository iCategoriaRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de SubscriptionService que permite la inyección de dependencias.
    @Autowired
    public CategoriaService(ICategoriaRepository iCategoriaRepository, ObjectMapper objectMapper) {
        this.iCategoriaRepository = iCategoriaRepository;
        this.objectMapper = objectMapper;
    }
    @Override
    public Long guardar(Categoria categoria) {
        logger.info("Categoria - guardar: Se va a guardar la categoria");
        iCategoriaRepository.save(categoria);
        return categoria.getId();
    }
    @Override
    public List<Categoria> mostrarTodos() {
        return iCategoriaRepository.findAll();
    }


    @Override
    public Categoria buscarPorId(Long id) throws ResourceNotFoundException {
        Optional<Categoria> found = iCategoriaRepository.findById(id);
        if (found.isPresent()) {
            logger.info("Categoria - buscarPorId: Se encontro la categoria y se devolvera");
            return found.get();
        } else {
            logger.warn("Categoria - buscarPorId: No se encontro ninguna categoria con ese ID");
            throw new ResourceNotFoundException("La categoria no existe");
        }
    }



    @Override
    public void modificar(Categoria categoria) {
        logger.info("Categoria - actualizar: Se va a actualizar la categoria");
        guardar(categoria);
    }
    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Categoria> found = iCategoriaRepository.findById(id);
        if (found.isPresent()) {
            iCategoriaRepository.deleteById(id);
            logger.warn("Categoria - eliminar: Se ha eliminado la categoria");
        } else {
            logger.error("No se ha encontrado ninguna categoria con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado la categoria");
        }
    }
}
