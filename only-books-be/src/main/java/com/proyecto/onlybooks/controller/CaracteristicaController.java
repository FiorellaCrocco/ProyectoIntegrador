package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.CaracteristicaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/caracteristica")
public class CaracteristicaController {
    private final CaracteristicaService caracteristicaService;

    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    // En la url "/caracteristica/listar" retorno una lista de UserDTO
    @GetMapping("/listar")
    public List<Caracteristica> listarcaracteristica() {
        List<Caracteristica> caracteristica = caracteristicaService.mostrarTodos();
        return caracteristica;
    }

    // En la url "/caracteristica/{id}" retorno el UserDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<Caracteristica> buscarUnaCaracteristica(@PathVariable Long id) throws ResourceNotFoundException {
        return ResponseEntity.ok(caracteristicaService.buscarPorId(id));
    }

    // En la url "/caracteristica/agregar" hacemos un POST para guardar el user
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarCaracteristica(@RequestBody Caracteristica caracteristica) {
        caracteristicaService.guardar(caracteristica);
        return ResponseEntity.status(HttpStatus.OK).body(caracteristica.getId());
    }

    // En la url "/caracteristica/modificar" actualizamos un user ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnaCaracteristica(@RequestBody Caracteristica caracteristica) {
        caracteristicaService.modificar(caracteristica);
        return ResponseEntity.ok().body("Se modificó la caracteristica.");
    }

    // En la url "/caracteristica/eliminar/{id}" utilizamos el metodo DELETE para eliminar un user segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCaracteristica(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        caracteristicaService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Caracteristica eliminada.");
        return response;
    }
}
