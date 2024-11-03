package com.example.PDTS.Repository;

import com.example.PDTS.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository interface for Courier entity
public interface CourierRepository extends JpaRepository<Courier, Long> {}
