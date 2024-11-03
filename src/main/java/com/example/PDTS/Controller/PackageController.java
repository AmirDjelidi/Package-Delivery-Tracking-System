package com.example.PDTS.Controller;

import com.example.PDTS.Package;
import com.example.PDTS.Service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packages")
@CrossOrigin(origins = "http://localhost:3000")
public class PackageController {
    @Autowired
    private PackageService packageService;

    // Add a new package
    @PostMapping
    public ResponseEntity<Package> addPackage(@RequestBody Package pack) {
        Package savedPackage = packageService.savePackage(pack, pack.getCourierId());
        return ResponseEntity.ok(savedPackage);
    }

    // Retrieve a package by ID
    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update the status of an existing package
    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackageStatus(@PathVariable Long id, @RequestBody Package updatedPackage) {
        return packageService.getPackageById(id)
                .map(existingPackage -> {
                    existingPackage.setStatus(updatedPackage.getStatus()); // Update status
                    Package savedPackage = packageService.savePackage(existingPackage, existingPackage.getCourierId());
                    return ResponseEntity.ok(savedPackage);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete a package by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackageById(@PathVariable Long id) {
        if (packageService.deletePackageById(id)) {
            return ResponseEntity.noContent().build(); // 204 No Content, deletion successful
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found if package doesn't exist
        }
    }

    // Retrieve a package by its tracking number
    @GetMapping("/tracking/{trackingNumber}")
    public ResponseEntity<Package> getPackageByTrackingNumber(@PathVariable String trackingNumber) {
        Package pack = packageService.getPackageByTrackingNumber(trackingNumber);
        return pack != null ? ResponseEntity.ok(pack) : ResponseEntity.notFound().build();
    }

    // List all packages
    @GetMapping
    public ResponseEntity<List<Package>> getAllPackages() {
        List<Package> packages = packageService.getAllPackages();
        return ResponseEntity.ok(packages);
    }

    // List all packages for a specific courier
    @GetMapping("/courier/{courierId}")
    public ResponseEntity<List<Package>> getPackagesByCourierId(@PathVariable Long courierId) {
        List<Package> packages = packageService.getPackagesByCourierId(courierId);
        return ResponseEntity.ok(packages);
    }
}
