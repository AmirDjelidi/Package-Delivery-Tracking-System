package com.example.PDTS;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

// Entity representing a package
@Entity
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String trackingNumber; // Unique tracking number
    private String status;         // Current status of the package
    private LocalDateTime createdAt;  // Creation timestamp
    private LocalDateTime updatedAt;  // Last update timestamp
    private Long courierId;        // Associated courier's ID

    private String description;    // Package description
    private String addressee;      // Recipient's name

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourierId() {
        return courierId;
    }

    public void setCourierId(Long courierId) {
        this.courierId = courierId;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddressee() {
        return addressee;
    }

    public void setAddressee(String addressee) {
        this.addressee = addressee;
    }

    // Automatically set fields before saving a new package to the database
    @PrePersist
    protected void onCreate() {
        this.trackingNumber = UUID.randomUUID().toString().replace("-", "").substring(0, 13); // Generate unique tracking number
        if (this.status == null) {
            this.status = "In preparation"; // Default status if none provided
        }
        createdAt = LocalDateTime.now(); // Set creation timestamp
        updatedAt = LocalDateTime.now(); // Set initial update timestamp
    }

    // Update the 'updatedAt' timestamp before updating the package
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
