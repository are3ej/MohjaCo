import React from 'react';
import '../styles/HeroSection.css';
// import heroImage from '../assets//vv.jpg';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h2 className="hero-title">Your Trusted Partner in Heavy Equipment Trading</h2>
          <p className="hero-subtitle">Since 2008 - Quality Machinery, Unmatched Service</p>
          <div className="hero-cta">
            <a href="/for-sale" className="cta-button primary">Browse Inventory</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;