import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  useEffect(() => {
    // Add animation classes after component mount
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <img 
              src="/images/logo_5.png" 
              alt="Mohja Logo" 
              className="hero-logo animate-on-scroll fade-in"
            />
            <h1 className="animate-on-scroll slide-up">
              Welcome to Mohja Company
            </h1>
            <p className="animate-on-scroll slide-up">
              Your Trusted Partner in Industrial Excellence
            </p>
            <div className="hero-buttons animate-on-scroll slide-up">
              <Link to="/equipment" className="btn btn-primary">
                Our Equipment
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title animate-on-scroll fade-in">
            Why Choose Mohja?
          </h2>
          <div className="features-grid">
            <div className="feature-card animate-on-scroll slide-up">
              <i className="fas fa-cogs"></i>
              <h3>Expert Solutions</h3>
              <p>Providing innovative industrial solutions with cutting-edge technology</p>
            </div>
            <div className="feature-card animate-on-scroll slide-up">
              <i className="fas fa-award"></i>
              <h3>Quality Assurance</h3>
              <p>Committed to delivering excellence in every project we undertake</p>
            </div>
            <div className="feature-card animate-on-scroll slide-up">
              <i className="fas fa-users"></i>
              <h3>Professional Team</h3>
              <p>Highly skilled professionals with years of industry experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll fade-in">
            <h2>Ready to Transform Your Industry?</h2>
            <p>Let's work together to achieve excellence in your industrial operations</p>
            <Link to="/contact" className="btn btn-primary">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
