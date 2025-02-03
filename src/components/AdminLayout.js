import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Mohja Admin</h2>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/equipment" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">📦</span>
            Equipment
          </NavLink>
          
          <NavLink 
            to="/sold" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">💰</span>
            Sold Equipment
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <div className="breadcrumb">
            <NavLink to="/">Home</NavLink> / Admin Area
          </div>
          <div className="admin-header-actions">
            <button onClick={() => navigate('/')} className="view-site-button">
              View Site
            </button>
          </div>
        </div>
        
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
