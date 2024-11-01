package com.example.PDTS.Service;

import com.example.PDTS.Package;
import com.example.PDTS.Repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {
    @Autowired
    private PackageRepository packageRepository;

    // Méthode pour sauvegarder un colis avec l'ID du transporteur
    public Package savePackage(Package pack, Long courierId) {
        pack.setCourierId(courierId);  // Associer l'ID du transporteur au colis
        return packageRepository.save(pack);
    }

    public Optional<Package> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    public Package getPackageByTrackingNumber(String trackingNumber) {
        return packageRepository.findByTrackingNumber(trackingNumber);
    }

    public boolean deletePackageById(Long id) {
        if (packageRepository.existsById(id)) {
            packageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    // Nouvelle méthode pour obtenir tous les colis d'un transporteur spécifique
    public List<Package> getPackagesByCourierId(Long courierId) {
        return packageRepository.findByCourierId(courierId);
    }
}
