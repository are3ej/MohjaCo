import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-section company-info">
            <img src="/logo-white.png" alt="Mohja Co." className="footer-logo" />
            <p className="company-desc">
              Leading provider of industrial equipment and machinery solutions. 
              With years of experience, we deliver excellence in every project.
            </p>
            <div className="social-links">
              <a href="#linkedin" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section quick-links">
            <h3>Quick Links</h3>
            <div className="two-column-links">
              <div className="link-column">
                <Link to="/">Home</Link>
                <Link to="/equipment">Equipment</Link>
                <Link to="/services">Services</Link>
                <Link to="/about">About Us</Link>
              </div>
              <div className="link-column">
                <Link to="/contact">Contact</Link>
                <Link to="/request-quote">Request Quote</Link>
                <Link to="/dashboard-login">Dashboard</Link>
                <Link to="/careers">Careers</Link>
              </div>
            </div>
          </div>

          <div className="footer-section contact-info">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h4>Location</h4>
                <p>123 Industrial Zone, City, Country</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div>
                <h4>Call Us</h4>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email Us</h4>
                <a href="mailto:info@mohjaco.com">info@mohjaco.com</a>
              </div>
            </div>
          </div>

          <div className="footer-section newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates and insights.</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Mohja Co. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;