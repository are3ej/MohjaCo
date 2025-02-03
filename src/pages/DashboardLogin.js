import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import '../styles/DashboardLogin.css';

const DashboardLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Check for lockout
    const storedLockout = localStorage.getItem('loginLockout');
    if (storedLockout) {
      const lockoutEnd = new Date(storedLockout);
      if (lockoutEnd > new Date()) {
        setLockoutTime(lockoutEnd);
      } else {
        localStorage.removeItem('loginLockout');
        localStorage.removeItem('loginAttempts');
      }
    }

    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
  }, [navigate, isAuthenticated]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if account is locked
    if (lockoutTime && lockoutTime > new Date()) {
      const timeLeft = Math.ceil((lockoutTime - new Date()) / 1000 / 60);
      setError(`Account is locked. Please try again in ${timeLeft} minutes.`);
      return;
    }

    setLoading(true);
    try {
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts);

      // Lock account after 3 failed attempts
      if (newAttempts >= 3) {
        const lockoutEnd = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes
        setLockoutTime(lockoutEnd);
        localStorage.setItem('loginLockout', lockoutEnd.toISOString());
        setError('Too many failed attempts. Account locked for 15 minutes.');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Admin Dashboard
          </motion.h1>
          <motion.p
            className="login-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            This area is restricted to authorized personnel only. Please enter your credentials to access the administrative dashboard.
          </motion.p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          className="login-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-group">
            <label htmlFor="username">Email Address</label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || (lockoutTime && lockoutTime > new Date())}
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </motion.button>
        </motion.form>

        <motion.div 
          className="login-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Need access? Please contact your system administrator.</p>
          <p className="security-note">🔒 Secure Connection</p>
          {loginAttempts > 0 && (
            <p className="attempt-counter">
              Failed attempts: {loginAttempts}/3
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardLogin;
