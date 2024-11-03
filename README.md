# Package Delivery Tracking System

**Authors**: Amir DJELIDI, Rayan HOUFANI  
This project is a package delivery tracking system built with a RESTful architecture. The backend is developed in Java with Spring Boot, and the frontend is implemented in React. This system allows users to track packages, view courier details, and manage delivery statuses.

## Project Setup

### Backend Setup
1. **Database Configuration**:
   - Go to the `src/main/resources/application.properties` file.
   - Configure your database connection (PostgreSQL is recommended, but any compatible database can be used).
   
2. **Run the Backend**:
   - Run the backend application by starting the file: `src/main/java/com/example/PDTS/PackageDeliveryTrackingSystemApplication`.
   - Make sure **port 8080 is free** before starting the backend; otherwise, it will fail to start, and the frontend will not be able to make requests.

### Frontend Setup
1. **Navigate to the Frontend Directory**:
   ```bash
   cd tracking-app
2. **Install Dependencies**:
   ```bash
     npm install
3. **Start the Frontend**:
   ```bash
     npm start
  - It will redirect you to the `localhost:3000` where a Login Page is waiting you. Don't worry, it's a fake Login Page, you can put anything you want in inputs and access to the website.


