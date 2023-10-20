package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.SubscriptionDTO;
import com.proyecto.onlybooks.entity.Subscription;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface ISubscriptionService {
    public interface IUserService {
        void guardar(Subscription subscription);
        SubscriptionDTO buscarPorId(Long id) throws ResourceNotFoundException;
        void modificar(Subscription subscription) throws ResourceNotFoundException;
        void eliminar(Long id) throws ResourceNotFoundException;
        List<SubscriptionDTO> mostrarTodos();
    }
}
