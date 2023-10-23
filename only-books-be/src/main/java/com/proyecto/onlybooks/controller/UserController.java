package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    UserService userService;

    // Constructor de UserController que permite la inyección de dependencias.
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // En la url "/user/listar" retorno una lista de UserDTO
    @GetMapping("/listar")
    public List<UserDTO> buscarUsers() {
        List<UserDTO> listarUsers = userService.mostrarTodos();
        return listarUsers;
    }

    // En la url "/user/{id}" retorno el UserDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> buscarUnUser(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(userService.buscarPorId(id));
    }

    // En la url "/user/agregar" hacemos un POST para guardar el user
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarUser(@RequestBody User user) {
        userService.guardar(user);
        return ResponseEntity.status(HttpStatus.OK).body(user.getId());
    }

    // En la url "/user/modificar" actualizamos un user ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnUser(@RequestBody User user) {
        userService.modificar(user);
        return ResponseEntity.ok().body("Se modifico el usuario.");
    }

    // En la url "/user/eliminar/{id}" utilizamos el metodo DELETE para eliminar un user segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarBook(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        userService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Usuario eliminado.");
        return response;
    }

}
