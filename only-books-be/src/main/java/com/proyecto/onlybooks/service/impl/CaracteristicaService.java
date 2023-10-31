package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.ICaracteristicaRepository;
import com.proyecto.onlybooks.service.ICaracteristicaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicaService implements ICaracteristicaService {
    private static final Logger logger = Logger.getLogger(User.class);

    // Repositorio de User utilizado para acceder a la base de datos.
    private final ICaracteristicaRepository iCaracteristicaRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de SubscriptionService que permite la inyección de dependencias.
    @Autowired
    public CaracteristicaService(ICaracteristicaRepository iCaracteristicaRepository, ObjectMapper objectMapper) {
        this.iCaracteristicaRepository = iCaracteristicaRepository;
        this.objectMapper = objectMapper;
    }
    @Override
    public Long guardar(Caracteristica caracteristica) {
        logger.info("Caracteristica - guardar: Se va a guardar la característica");
        iCaracteristicaRepository.save(caracteristica);
        return caracteristica.getId();
    }

    @Override
    public List<Caracteristica> mostrarTodos() {
        return iCaracteristicaRepository.findAll();
    }
    @Override
    public Caracteristica buscarPorId(Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> found = iCaracteristicaRepository.findById(id);
        if (found.isPresent()) {
            logger.info("Caracteristica - buscarPorId: Se encontró la característica y se devolverá");
            return found.get();
        } else {
            logger.warn("Caracteristica - buscarPorId: No se encontró ninguna característica con ese ID");
            throw new ResourceNotFoundException("La característica no existe");
        }
    }
    @Override
    public void modificar(Caracteristica caracteristica) {
        logger.info("Caracteristica - actualizar: Se va a actualizar la característica");
        guardar(caracteristica);
    }
    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Caracteristica> found = iCaracteristicaRepository.findById(id);
        if (found.isPresent()) {
            iCaracteristicaRepository.deleteById(id);
            logger.warn("Caracteristica - eliminar: Se ha eliminado la característica");
        } else {
            logger.error("No se ha encontrado ninguna característica con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado la característica");
        }
    }
}
