import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable. Please check the URL or return to our homepage.
          </p>
          <Link to="/" className="btn">
            <i className="fas fa-home"></i>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
