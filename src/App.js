import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';
import Equipment from './pages/Equipment';
import AdminLogin from './pages/AdminLogin';   
import SoldEquipment from './pages/SoldEquipment';
import AdminEquipmentManager from './components/Admin/AdminEquipmentManager';
import { authService } from './services/auth';
import './App.css';
import { TranslationProvider } from './context/TranslationContext';
const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="app">
      <main className="main-content">
        <div className="page-container">
          {children}
        </div>
      </main>
    <Footer />
    </div>
  </>
);

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

const ProtectedAdminRoute = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    error: null
  });
  
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log('Checking Admin Authentication Status');
        const isAdmin = await authService.checkAdminStatus(); // Use authService here
        
        console.log('Admin Authentication Result:', { 
          isAdmin,
          currentPath: location.pathname 
        });

        setAuthState({
          isAuthenticated: isAdmin,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Authentication check failed:', error);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: error.message
        });
      }
    };

    checkAuthStatus();
  }, [location.pathname]);
  if (authState.isLoading) {
    return <LoadingSpinner />;
  }

  if (!authState.isAuthenticated) {
    console.warn('Unauthorized Access Attempt', {
      currentPath: location.pathname
    });
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {
  return (
    <TranslationProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
        <Route path="/equipment" element={<MainLayout><Equipment /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
        <Route path="/privacy-policy" element={<MainLayout><PrivacyPolicy /></MainLayout>} />
        <Route path="/sold-equipment" element={<MainLayout><SoldEquipment /></MainLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/equipment" 
          element={
            <ProtectedAdminRoute>
              <MainLayout>
                <AdminEquipmentManager />
              </MainLayout>
            </ProtectedAdminRoute>
          } 
        />
        
        {/* Catch-all admin routes */}
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </Router>
    </TranslationProvider>
  );
}

export default App;