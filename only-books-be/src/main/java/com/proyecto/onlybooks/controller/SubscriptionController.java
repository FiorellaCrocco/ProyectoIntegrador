package com.proyecto.onlybooks.controller;

import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.SubscriptionDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Subscription;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.service.impl.SubscriptionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subscription")
public class SubscriptionController {

    SubscriptionService subscriptionService;

    // Constructor de SubscriptionController que permite la inyección de dependencias.
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    // En la url "/subscription/listar" retorno una lista de SubscriptionDTO
    @GetMapping("/listar")
    public List<SubscriptionDTO> buscarUnaSubscription() {
        List<SubscriptionDTO> listarSubscription = subscriptionService.mostrarTodos();
        return listarSubscription;
    }

    // En la url "/subscription/{id}" retorno la SubscriptionDTO deseado (segun el ID) y si no lo encuentra se dispara una Exception
    @GetMapping("/{id}")
    public ResponseEntity<SubscriptionDTO> buscarUnaSubscription(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(subscriptionService.buscarPorId(id));
    }

    // En la url "/subscription/agregar" hacemos un POST para guardar la subscription
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarSubscription(@RequestBody Subscription subscription) {
        subscriptionService.guardar(subscription);
        return ResponseEntity.status(HttpStatus.OK).body(subscription.getId());
    }

    // En la url "/subscription/modificar" actualizamos una subscription ya existente
    @PutMapping("/modificar")
    public ResponseEntity<?> actualizarUnaSubscription(@RequestBody Subscription subscription) {
        subscriptionService.modificar(subscription);
        return ResponseEntity.ok().body("Se modifico la subscription.");
    }

    // En la url "/subscription/eliminar/{id}" utilizamos el metodo DELETE para eliminar una subscription segun su ID, si no existe lanzo ResourceNotFoundException
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarSubscription(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity<?> response = null;
        subscriptionService.eliminar(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Subscription eliminada.");
        return response;
    }
}
