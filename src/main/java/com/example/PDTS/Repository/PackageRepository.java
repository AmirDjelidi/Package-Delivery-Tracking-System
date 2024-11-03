package com.example.PDTS.Repository;

import com.example.PDTS.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Repository interface for Package entity
public interface PackageRepository extends JpaRepository<Package, Long> {
    // Method to find packages by courier ID
    List<Package> findByCourierId(Long courierId);

    // Method to find a package by its tracking number
    Package findByTrackingNumber(String trackingNumber);
}
