package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.SubscriptionDTO;
import com.proyecto.onlybooks.entity.Subscription;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ISubscriptionService {

        Long guardar(Subscription subscription);
        List<SubscriptionDTO> mostrarTodos();
        SubscriptionDTO buscarPorId(Long id) throws ResourceNotFoundException;
        void modificar(Subscription subscription);
        void eliminar(Long id) throws ResourceNotFoundException;

}
