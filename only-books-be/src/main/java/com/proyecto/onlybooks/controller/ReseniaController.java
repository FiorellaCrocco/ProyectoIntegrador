package com.proyecto.onlybooks.controller;


import com.proyecto.onlybooks.entity.Resenia;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.ReseniaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/resenia")
public class ReseniaController {
    ReseniaService reseniaService;

    public ReseniaController(ReseniaService reseniaService){
        this.reseniaService=reseniaService;
    }

    @GetMapping("/listar")
    public List<Resenia> listarResenias(){
        List<Resenia> resenias = reseniaService.mostrarTodos();
        return resenias;
    }
    @GetMapping("/{id}")
    public ResponseEntity<Resenia> buscarUnaResenia(@PathVariable Long id) throws ResourceNotFoundException{
        return ResponseEntity.ok(reseniaService.buscarPorId(id));
    }

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarResenia(@RequestBody Resenia resenia) throws ResourceNotFoundException {
        reseniaService.guardar(resenia);
        return ResponseEntity.status(HttpStatus.OK).body(resenia.getId());
    }

    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarResenia(@RequestBody Resenia resenia)throws ResourceNotFoundException{
        reseniaService.modificar(resenia);
        return ResponseEntity.status(HttpStatus.OK).body("Se modifico la reseña");
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarResenia(@PathVariable Long id)throws ResourceNotFoundException{
        reseniaService.eliminar(id);
        return ResponseEntity.status(HttpStatus.OK).body("Reseña eliminada");
    }

    @GetMapping("/book/{id}")
    public List<Resenia> buscarReseniaPorBookId(@PathVariable Long id) throws ResourceNotFoundException{
        List<Resenia> lista = reseniaService.buscarReseniaPorBookId(id);
        if(lista!=null){
            return lista;
        }else {
            throw new ResourceNotFoundException("No se encontraron reseñas para el libro.");
        }
    }
















}
