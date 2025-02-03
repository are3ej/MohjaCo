import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Header.css';

// Contact Item Component
const ContactItem = ({ href, icon, text, isLocation }) => {
  const Tag = isLocation ? 'span' : 'a';
  return (
    <Tag 
      href={!isLocation ? href : undefined}
      className="contact-item"
      target={!isLocation && href?.startsWith('http') ? '_blank' : undefined}
      rel={!isLocation && href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <i className={`fas ${icon}`}></i>
      <span>{text}</span>
    </Tag>
  );
};

ContactItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isLocation: PropTypes.bool
};

// Social Link Component
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="social-link"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    <i className={`fab ${icon}`}></i>
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

// Nav Link Component
const NavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`nav-link ${isActive ? 'active' : ''}`}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'unset' : 'hidden';
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-top">
        <div className="container">
          <div className="contact-info">
            <ContactItem
              href="tel:+962790582699"
              icon="fa-phone"
              text="+962790582699"
            />
            <ContactItem
              href="mailto:osama8821070@yahoo.com"
              icon="fa-envelope"
              text="osama8821070@yahoo.com"
            />
            <ContactItem
              isLocation
              icon="fa-map-marker-alt"
              text="Free Zone Al-Zarqa, Jordan"
            />
          </div>
          <div className="header-actions">
            <div className="social-links">
              <SocialLink
                href="https://facebook.com/mohja"
                icon="fa-facebook-f"
                label="Facebook"
              />
              <SocialLink
                href="https://tiktok.com/mohja"
                icon="fa-tiktok"
                label="TikTok"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/images/logo_5.png" alt="Mohja Logo" />
          </Link>
          
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <nav className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/equipment" onClick={closeMenu}>
              Equipment
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;