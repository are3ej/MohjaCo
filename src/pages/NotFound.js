import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home"></i>
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
