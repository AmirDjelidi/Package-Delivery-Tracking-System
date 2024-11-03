package com.example.PDTS.Service;

import com.example.PDTS.Package;
import com.example.PDTS.Repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Service for handling operations related to packages
@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    // Save a package with its associated courier ID
    public Package savePackage(Package pack, Long courierId) {
        pack.setCourierId(courierId);  // Link the package with the courier ID
        return packageRepository.save(pack);
    }

    // Retrieve a package by its ID
    public Optional<Package> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    // Retrieve a package by its tracking number
    public Package getPackageByTrackingNumber(String trackingNumber) {
        return packageRepository.findByTrackingNumber(trackingNumber);
    }

    // Delete a package by ID if it exists
    public boolean deletePackageById(Long id) {
        if (packageRepository.existsById(id)) {
            packageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Retrieve all packages from the database
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // Retrieve all packages associated with a specific courier
    public List<Package> getPackagesByCourierId(Long courierId) {
        return packageRepository.findByCourierId(courierId);
    }
}
