import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import AdminUsers from './pages/AdminUsers';
import TenantSignUp from './pages/TenantSignUp';
import TenantDashboard from './pages/UserDashboard';
import CreateTenant from './pages/CreateTenant';
import HospitalProfile from './pages/HospitalProfile';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user is authenticated from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

 
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('showChangePassword', 'true');
  };

  if (isAuthenticated === null) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="*" element={<Login onLogin={handleLogin} />} />
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<TenantDashboard />} />
          <Route path="tenant-management" element={<TenantDashboard />} />
          <Route path="tenant-management/:tenantId" element={<HospitalProfile />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="user-signup" element={<CreateTenant />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;