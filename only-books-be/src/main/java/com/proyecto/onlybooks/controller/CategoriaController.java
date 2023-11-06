package com.proyecto.onlybooks.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    CategoriaService categoriaService;

    // Constructor de UserController que permite la inyección de dependencias.
    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @Autowired
    private AmazonS3 s3;

    // En la url "/categoria/listar" retorno una lista de UserDTO
    @GetMapping("/listar")
    public List<Categoria> listarCategorias() {
        List<Categoria> categorias = categoriaService.mostrarTodos();
        return categorias;
    }

    // En la url "/categoria/{id}" retorno el UserDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarUnaCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(categoriaService.buscarPorId(id));
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarCategoria(@RequestBody Categoria categoria) {
        String base64Image = (categoria.getImagen() != null) ? categoria.getImagen() : "";
        ObjectMetadata objectMetadata = new ObjectMetadata();

        try {
            byte[] binaryData = Base64.getDecoder().decode(base64Image);
            System.out.println("Cadena base64 a decodificar: " + base64Image);

            String key = categoria.getTitulo() + "_" + UUID.randomUUID().toString() + ".jpg";

            objectMetadata.setContentLength(binaryData.length);
            s3.putObject("onlybooksbucket", key, new ByteArrayInputStream(binaryData), objectMetadata);
            categoria.setImagen("https://onlybooksbucket.s3.amazonaws.com/" + key);
        } catch (IllegalArgumentException | AmazonServiceException e) {
            System.err.println("Error al procesar la imagen " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar la categoría.");
        }
        categoriaService.guardar(categoria);
        return ResponseEntity.status(HttpStatus.OK).body(categoria.getId());
    }

    // En la url "/categoria/modificar" actualizamos un user ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnaCategoria(@RequestBody Categoria categoria) {
        categoriaService.modificar(categoria);
        return ResponseEntity.ok().body("Se modificó la categoría.");
    }

    // En la url "/categoria/eliminar/{id}" utilizamos el metodo DELETE para eliminar un user segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCategoria(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        categoriaService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Categoría eliminada.");
        return response;
    }
}
