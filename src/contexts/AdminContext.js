import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/auth';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

  const login = async (username, password) => {
    try {
      await AuthService.login(username, password);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
