package com.example.PDTS.Service;

import com.example.PDTS.Courier;
import com.example.PDTS.Repository.CourierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourierService {
    @Autowired
    private CourierRepository courierRepository;

    public Courier saveCourier(Courier courier) {
        return courierRepository.save(courier);
    }

    public Optional<Courier> getCourierById(Long id) {
        return courierRepository.findById(id);
    }

    public List<Courier> getAllCouriers() {
        return courierRepository.findAll();
    }

    public boolean deleteCourierById(Long id) {
        if (courierRepository.existsById(id)) {
            courierRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
