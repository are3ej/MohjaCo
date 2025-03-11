import React, { useState, useEffect, createContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaBars, FaTimes, FaPhoneAlt, FaHome, FaInfoCircle, FaCog, FaTools, FaEnvelope } from 'react-icons/fa';
import MOHJA_DESIGN from '../styles/design';
import LanguageToggle from './LanguageToggle';

// Keyframe animations
const underlineExpand = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

// Dynamic Color Context
const ColorContext = createContext({
  primaryColor: MOHJA_DESIGN.COLORS.PRIMARY,
  secondaryColor: MOHJA_DESIGN.COLORS.SECONDARY
});

// Color Provider Component
const ColorProvider = ({ children, route }) => {
  const CONSISTENT_COLORS = {
    primary: '#1E3A8A',     // Deep Blue - Main Brand Color
    secondary: '#3B82F6',   // Bright Blue - Accent Color
    gradient: {
      start: '#1E3A8A', 
      end: '#3B82F6'
    }
  };

  return (
    <ColorContext.Provider value={CONSISTENT_COLORS}>
      {children}
    </ColorContext.Provider>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/services', label: 'Services', icon: <FaCog /> },
    { path: '/equipment', label: 'Equipment', icon: <FaTools /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> }
  ];

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ColorProvider route={location.pathname}>
      <ColorContext.Consumer>
        {({ primary, secondary, gradient }) => (
          <>
            <StyledHeader 
              scrolled={isScrolled} 
              primaryColor={primary} 
              secondaryColor={secondary}
              gradientStart={gradient.start}
              gradientEnd={gradient.end}
            >
              <HeaderContainer>
                <LogoSection to="/">
                  <LogoWrapper>
                    <LogoImage src="/images/logo_5.png" alt="Mohja Logo" />
                    <LogoText>
                      <LogoMainText>MOHJA COMPANY</LogoMainText>
                      <LogoSubtitle>FOR CONSTRUCTION EQUIPMENT TRADING</LogoSubtitle>
                    </LogoText>
                  </LogoWrapper>
                </LogoSection>

                <NavContainer>
                  <NavLinks>
                    {navItems.map((item) => (
                      <NavLink 
                        key={item.path}
                        to={item.path}
                        className={location.pathname === item.path ? 'active' : ''}
                      >
                        {item.icon}
                        {item.label}
                      </NavLink>
                    ))}
                  </NavLinks>
                  <CallOptions>
                    <CallOptionsButton primaryColor={primary} secondaryColor={secondary}>
                      <FaPhoneAlt />
                      Contact Us
                    </CallOptionsButton>
                    <LanguageToggleWrapper>
                      <LanguageToggle />
                    </LanguageToggleWrapper>
                  </CallOptions>
                </NavContainer>

                <MobileMenuToggle onClick={toggleMobileMenu}>
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </MobileMenuToggle>
              </HeaderContainer>
            </StyledHeader>

            <MobileMenu isOpen={isMenuOpen}>
              <MobileNavLinks>
                {navItems.map((item) => (
                  <MobileNavLink 
                    key={item.path}
                    to={item.path} 
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </MobileNavLink>
                ))}
              </MobileNavLinks>
              <MobileCallOptions>
                <MobileCallOptionsButton primaryColor={primary} secondaryColor={secondary}>
                  Call Us
                </MobileCallOptionsButton>
                <LanguageToggleWrapper>
                  <LanguageToggle />
                </LanguageToggleWrapper>
              </MobileCallOptions>
            </MobileMenu>
          </>
        )}
      </ColorContext.Consumer>
    </ColorProvider>
  );
};

// Styled Components
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(
    135deg, 
    ${props => props.gradientStart}cc, 
    ${props => props.gradientEnd}cc
  );
  backdrop-filter: blur(15px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);

  ${props => props.scrolled && `
    background: linear-gradient(
      135deg, 
      ${props.gradientStart}aa, 
      ${props.gradientEnd}aa
    );
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 24px rgba(30, 58, 138, 0.15);
    height: 60px;
  `}

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const LogoSection = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(30, 58, 138, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
`;

const LogoMainText = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const LogoSubtitle = styled.div`
  font-size: 0.6rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 0.2rem;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const NavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: white;
    background-color: rgba(59, 130, 246, 0.1);
    border-radius: 6px;
  }

  &.active {
    font-weight: 600;
    color: white;

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #3B82F6;
      animation: ${underlineExpand} 0.3s ease-out;
    }
  }
`;

const CallOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CallOptionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.primaryColor};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 0.5rem;

  &:hover {
    background: ${props => props.secondaryColor};
    transform: translateY(-2px);
  }
`;

const LanguageToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: #3B82F6;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    background: linear-gradient(
      135deg, 
      rgba(30, 58, 138, 0.95), 
      rgba(59, 130, 246, 0.95)
    );
    padding: 1rem;
    z-index: 999;
    backdrop-filter: blur(10px);
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  gap: 0.75rem;

  &:hover, &.active {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }
`;

const MobileCallOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const MobileCallOptionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.primaryColor};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.secondaryColor};
    transform: translateY(-2px);
  }
`;

export default Header;