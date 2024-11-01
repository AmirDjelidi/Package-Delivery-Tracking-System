package com.example.PDTS.Controller;

import com.example.PDTS.Courier;
import com.example.PDTS.Service.CourierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/couriers")
public class CourierController {
    @Autowired
    private CourierService courierService;

    // Ajouter un nouveau transporteur
    @PostMapping
    public ResponseEntity<Courier> addCourier(@RequestBody Courier courier) {
        Courier savedCourier = courierService.saveCourier(courier);
        return ResponseEntity.ok(savedCourier);
    }

    // Récupérer un transporteur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Courier> getCourierById(@PathVariable Long id) {
        return courierService.getCourierById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Lister tous les transporteurs
    @GetMapping
    public ResponseEntity<List<Courier>> getAllCouriers() {
        List<Courier> couriers = courierService.getAllCouriers();
        return ResponseEntity.ok(couriers);
    }

    // Supprimer un transporteur par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourierById(@PathVariable Long id) {
        if (courierService.deleteCourierById(id)) {
            return ResponseEntity.noContent().build(); // 204 No Content, suppression réussie
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found, si le transporteur n'existe pas
        }
    }
}
