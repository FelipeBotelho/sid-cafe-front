
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { PublicLayout, HomePage, MenuPage } from './pages/PublicPortal';
import { AdminLayout, LoginPage, ProtectedRoute } from './pages/AdminPortal';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminSales } from './pages/AdminSales';
import { AdminManagement } from './pages/AdminManagement';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="sales" element={<AdminSales />} />
              <Route path="management" element={<AdminManagement />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
