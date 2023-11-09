package com.proyecto.onlybooks.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.proyecto.onlybooks.entity.Caracteristica;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.CaracteristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/caracteristica")
public class CaracteristicaController {
    private final CaracteristicaService caracteristicaService;

    public CaracteristicaController(CaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }
    @Autowired
    private AmazonS3 s3;

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
        String base64Image = (caracteristica.getIcono() != null) ? caracteristica.getIcono() : "";
        ObjectMetadata objectMetadata = new ObjectMetadata();

        try {
            byte[] binaryData = Base64.getDecoder().decode(base64Image);

            String key = caracteristica.getTitle() + "_" + UUID.randomUUID().toString() + ".jpg";

            objectMetadata.setContentLength(binaryData.length);
            s3.putObject("onlybooksbucket", key, new ByteArrayInputStream(binaryData), objectMetadata);
            caracteristica.setIcono("https://onlybooksbucket.s3.amazonaws.com/" + key);
        } catch (IllegalArgumentException | AmazonServiceException e) {
            System.err.println("Error al procesar la imagen " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar la caracteristica.");
        }
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
