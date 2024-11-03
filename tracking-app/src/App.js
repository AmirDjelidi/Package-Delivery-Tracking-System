// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PackageDetails from './components/PackageDetails';
import NewPackageForm from './components/NewPackageForm';
import CourierList from "./components/ListCourier";
import NewCourierForm from "./components/NewCourierForm";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/new-package" element={<NewPackageForm />} />
          <Route path="/couriers" element={<CourierList />} />
          <Route path="/new-courier" element={<NewCourierForm />} />
      </Routes>
    </Router>
  );
}

export default App;


