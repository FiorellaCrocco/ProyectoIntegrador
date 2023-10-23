package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IUserService {

    Long guardar(User user);
    List<UserDTO> mostrarTodos();
    UserDTO buscarPorId(Long id) throws ResourceNotFoundException;
    void modificar(User user);
    void eliminar(Long id) throws ResourceNotFoundException;

}
