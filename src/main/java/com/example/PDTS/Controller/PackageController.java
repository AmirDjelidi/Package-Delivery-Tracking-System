package com.example.PDTS.Controller;

import com.example.PDTS.Package;
import com.example.PDTS.Service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {
    @Autowired
    private PackageService packageService;

    // Méthode pour ajouter un colis avec un transporteur
    @PostMapping
    public ResponseEntity<Package> addPackage(@RequestBody Package pack, @RequestParam Long courierId) {
        Package savedPackage = packageService.savePackage(pack, courierId); // Associer le transporteur via courierId
        return ResponseEntity.ok(savedPackage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackageById(@PathVariable Long id) {
        if (packageService.deletePackageById(id)) {
            return ResponseEntity.noContent().build(); // 204 No Content, suppression réussie
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found, si le colis n'existe pas
        }
    }

    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<Package> getPackageByTrackingNumber(@PathVariable String trackingNumber) {
        Package pack = packageService.getPackageByTrackingNumber(trackingNumber);
        return pack != null ? ResponseEntity.ok(pack) : ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Package>> getAllPackages() {
        List<Package> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    // Nouvel endpoint pour lister les colis par transporteur
    @GetMapping("/courier/{courierId}")
    public ResponseEntity<List<Package>> getPackagesByCourierId(@PathVariable Long courierId) {
        List<Package> packages = packageService.getPackagesByCourierId(courierId);
        return ResponseEntity.ok(packages);
    }
}
