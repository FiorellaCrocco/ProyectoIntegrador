package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.SubscriptionDTO;
import com.proyecto.onlybooks.entity.Subscription;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.ISubscriptionRepository;
import com.proyecto.onlybooks.service.ISubscriptionService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService implements ISubscriptionService {


    private static final Logger logger = Logger.getLogger(Subscription.class);

    // Repositorio de Subscription utilizado para acceder a la base de datos.
    private ISubscriptionRepository iSubscriptionRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de SubscriptionService que permite la inyección de dependencias.
    public SubscriptionService(ISubscriptionRepository iSubscriptionRepository, ObjectMapper objectMapper) {
        this.iSubscriptionRepository = iSubscriptionRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Long guardar(Subscription subscription) {
        logger.info("Subscription - guardar: Se va a guardar la subscription");
        iSubscriptionRepository.save(subscription);
        return subscription.getId();
    }

    @Override
    public List<SubscriptionDTO> mostrarTodos() {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        List<SubscriptionDTO> subscriptionDTOS = new ArrayList<>();  // Creamos un ArrayList de tipo SubscriptionDTOS
        for (Subscription p : iSubscriptionRepository.findAll()){    // Iteramos el array
            logger.info("Subscription - buscarTodos: Se esta iterando el array de Subscriptions");
            subscriptionDTOS.add(objectMapper.convertValue(p,SubscriptionDTO.class));  // En cada iteración convertimos el objeto de tipo Subscription a SubscriptionDTOS y lo agregamos al ArrayList
        }
        return subscriptionDTOS;
    }

    @Override
    public SubscriptionDTO buscarPorId(Long id) throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        Optional<Subscription> found = iSubscriptionRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o Subscription
        if(found.isPresent()) {  // Evaluamos si found tiene contenido
            logger.info("Subscription - buscarPorId: Se encontro la subscription y se convertira a DTO para ser devuelta");
            return objectMapper.convertValue(found, SubscriptionDTO.class);  // Convertimos a found que es de tipo Subscription a SubscriptionDTO.
        } else {
            logger.warn("Subscription - buscarPorId: No se encontro ninguna Subscription con ese ID");
            throw new ResourceNotFoundException("La subscription no existe");
        }
    }

    @Override
    public void modificar(Subscription subscription) {
        logger.info("Subscription - actualizar: Se va a actualizar  la subscription");
        guardar(subscription); // El método utiliza .save; este lo que hace es crear si el ID = 0 pero si ID!=0 actualiza los cambios.
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Subscription> found = iSubscriptionRepository.findById(id);
        if(found.isPresent()){
            iSubscriptionRepository.deleteById(id);
            logger.warn("Subscription - eliminar: Se ha eliminado el libro");
        } else {
            logger.error("No se ha encontrado ninguna Subscription con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado la Subscription");
        }
    }

}
