package com.proyecto.onlybooks.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IUserRepository;
import com.proyecto.onlybooks.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    private static final Logger logger = Logger.getLogger(User.class);

    // Repositorio de User utilizado para acceder a la base de datos.
    private IUserRepository iUserRepository;

    // Para la conversión de objetos.
    private ObjectMapper objectMapper;

    // Constructor de SubscriptionService que permite la inyección de dependencias.
    public UserService(IUserRepository iUserRepository, ObjectMapper objectMapper) {
        this.iUserRepository = iUserRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public Long guardar(User user) {
        logger.info("User - guardar: Se va a guardar el usuario");
        iUserRepository.save(user);
        return user.getId();
    }

    @Override
    public List<UserDTO> mostrarTodos() {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        List<UserDTO> UserDTO = new ArrayList<>();  // Creamos un ArrayList de tipo UserDTO
        for (User p : iUserRepository.findAll()){    // Iteramos el array
            logger.info("User - buscarTodos: Se esta iterando el array de usuarios");
            UserDTO.add(objectMapper.convertValue(p,UserDTO.class));  // En cada iteración convertimos el objeto de tipo User a UserDTO y lo agregamos al ArrayList
        }
        return UserDTO;
    }

    @Override
    public UserDTO buscarPorId(Long id) throws ResourceNotFoundException {
        objectMapper.registerModule(new JavaTimeModule()); // Se utiliza para solucionar el error "not supported by default: add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310""
        Optional<User> found = iUserRepository.findById(id);  // Utilizo el objeto Optional que permite que "found" devuelva nulo o User
        if(found.isPresent()) {  // Evaluamos si found tiene contenido
            logger.info("User - buscarPorId: Se encontro el usuario y se convertira a DTO para ser devuelto");
            return objectMapper.convertValue(found, UserDTO.class);  // Convertimos a found que es de tipo User a UserDTO.
        } else {
            logger.warn("User - buscarPorId: No se encontro ningun usuario con ese ID");
            throw new ResourceNotFoundException("El User no existe");
        }
    }

    @Override
    public void modificar(User user) {
        logger.info("User - actualizar: Se va a actualizar  el usuario");
        guardar(user); // El método utiliza .save; este lo que hace es crear si el ID = 0 pero si ID!=0 actualiza los cambios.
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<User> found = iUserRepository.findById(id);
        if(found.isPresent()){
            iUserRepository.deleteById(id);
            logger.warn("User - eliminar: Se ha eliminado el usuario");
        } else {
            logger.error("No se ha encontrado ningun usuario con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado el usuario");
        }
    }

}
