import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      const redirectTo = location.state?.from || '/equipment';
      navigate(redirectTo);
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="admin-login-container">
      <motion.div 
        className="admin-login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="password">Admin Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
