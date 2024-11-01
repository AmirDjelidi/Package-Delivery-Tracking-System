package com.example.PDTS.Repository;

import com.example.PDTS.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PackageRepository extends JpaRepository<Package, Long> {
    List<Package> findByCourierId(Long courierId);  // Méthode pour récupérer les colis par transporteur
    Package findByTrackingNumber(String trackingNumber);
}
