package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    CategoriaService categoriaService;

    // Constructor de UserController que permite la inyección de dependencias.
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // En la url "/user/listar" retorno una lista de UserDTO
    @GetMapping("/listar")
    public List<Categoria> listarCategorias() {
        List<Categoria> categorias = categoriaService.mostrarTodos();
        return categorias;
    }

    // En la url "/user/{id}" retorno el UserDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarUnaCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoriaService.buscarPorId(id));
    }

    // En la url "/user/agregar" hacemos un POST para guardar el user
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarCategoria(@RequestBody Categoria categoria) {
        categoriaService.guardar(categoria);
        return ResponseEntity.status(HttpStatus.OK).body(categoria.getId());
    }

    // En la url "/user/modificar" actualizamos un user ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnaCategoria(@RequestBody Categoria categoria) {
        categoriaService.modificar(categoria);
        return ResponseEntity.ok().body("Se modificó la categoría.");
    }

    // En la url "/user/eliminar/{id}" utilizamos el metodo DELETE para eliminar un user segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        categoriaService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoría eliminada.");
        return response;
    }
}
