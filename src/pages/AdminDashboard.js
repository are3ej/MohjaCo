import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import AuthService from '../services/auth';

const GIST_URL = 'https://gist.githubusercontent.com/are3ej/a8fdd6ae2aea0a300a337aab53281ea4/raw';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAdmin();
  const session = AuthService.getSession();
  const [stats, setStats] = useState({
    availableEquipment: 0,
    soldEquipment: 0,
    totalValue: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/dashboard-login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(GIST_URL);
        const data = await response.json();

        // Calculate stats
        const available = data.equipment.filter(item => !item.sold);
        const sold = data.equipment.filter(item => item.sold);
        
        const totalValue = available.reduce((sum, item) => sum + (item.price || 0), 0);

        setStats({
          availableEquipment: available.length,
          soldEquipment: sold.length,
          totalValue
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          Loading dashboard data...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header Section */}
        <motion.div 
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-top">
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="logout-button">
              <span>🚪</span> Logout
            </button>
          </div>
          <p className="last-updated">
            Logged in as: {session?.username}
          </p>
          <p className="last-updated">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            onClick={() => navigate('/equipment')}
          >
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>Available Equipment</h3>
              <p className="stat-number">{stats.availableEquipment}</p>
              <p className="stat-label">In Stock</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
            onClick={() => navigate('/sold')}
          >
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Sold Equipment</h3>
              <p className="stat-number">{stats.soldEquipment}</p>
              <p className="stat-label">This Month</p>
            </div>
          </motion.div>

          <motion.div 
            className="stat-card"
            whileHover={{ y: -5 }}
          >
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Total Value</h3>
              <p className="stat-number">${(stats.totalValue / 1000000).toFixed(1)}M</p>
              <p className="stat-label">Current Inventory</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Recent Sales Section */}
        <motion.div 
          className="recent-sales"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Recent Sales</h2>
          <div className="sales-list">
            <div className="sale-item">
              <div className="sale-icon">🚛</div>
              <div className="sale-details">
                <h4>Komatsu Excavator</h4>
                <p className="sale-date">Feb 1, 2025</p>
                <p className="sale-price">$85,000</p>
              </div>
            </div>
            <div className="sale-item">
              <div className="sale-icon">🚜</div>
              <div className="sale-details">
                <h4>CAT Bulldozer</h4>
                <p className="sale-date">Jan 28, 2025</p>
                <p className="sale-price">$120,000</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/equipment')}
            >
              <span>📦</span> View Inventory
            </motion.button>
            <motion.button
              className="action-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/sold')}
            >
              <span>📊</span> Sales Report
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
