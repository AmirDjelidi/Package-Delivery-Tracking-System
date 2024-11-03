package com.example.PDTS.Service;

import com.example.PDTS.Courier;
import com.example.PDTS.Repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Service for handling operations related to couriers
@Service
public class CourierService {
    @Autowired
    private CourierRepository courierRepository;

    // Save a new courier to the database
    public Courier saveCourier(Courier courier) {
        return courierRepository.save(courier);
    }

    // Retrieve a courier by ID
    public Optional<Courier> getCourierById(Long id) {
        return courierRepository.findById(id);
    }

    // Retrieve all couriers from the database
    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    // Delete a courier by ID if it exists
    public boolean deleteCourierById(Long id) {
        if (courierRepository.existsById(id)) {
            courierRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
