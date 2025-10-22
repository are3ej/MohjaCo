import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FacebookOutlined,
  WhatsAppOutlined
} from '@ant-design/icons';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MOHJA_DESIGN = {
  TYPOGRAPHY: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    scale: {
      sizes: { small: 0.875, base: 1, medium: 1.125, large: 1.5, xlarge: 2.5 },
      weights: { light: 300, regular: 400, semibold: 600, bold: 700 }
    }
  },
  COLORS: {
    PRIMARY: '#003082',
    SECONDARY: '#006cac',
    ACCENT: '#00a0e9',
    BACKGROUND: '#f4f7fa',
    WHITE: '#ffffff',
    TEXT_PRIMARY: '#1a2b3c',
    TEXT_SECONDARY: '#4a5568',
    GRADIENT_START: '#003082',
    GRADIENT_END: '#00a0e9'
  },
  ICON_COLORS: {
    location: '#FF6B6B',    // Vibrant coral red
    phone: '#4ECDC4',       // Bright teal
    email: '#45B7D1',       // Soft blue
    home: '#FF9F1C',        // Warm orange
    services: '#2A9D8F',    // Muted teal green
    equipment: '#E76F51',   // Terracotta
    about: '#264653'        // Deep blue-green
  },
  SPACING: {
    xs: 0.5,
    sm: 0.75,
    md: 1,
    lg: 1.5,
    xl: 2
  },
  ANIMATIONS: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.6
    },
    easing: {
      standard: [0.4, 0, 0.2, 1],
      entrance: [0, 0, 0.2, 1],
      exit: [0.4, 0, 1, 1]
    }
  }
};

const FooterWrapper = styled(motion.footer)`
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_START}, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_END}
  );
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  padding: 4rem 2rem;
  font-family: ${MOHJA_DESIGN.TYPOGRAPHY.fontFamily};
  overflow: hidden;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${MOHJA_DESIGN.SPACING.md}rem;
`;

const FooterTitle = styled.h4`
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  font-size: 1.125rem;
  font-weight: ${MOHJA_DESIGN.TYPOGRAPHY.scale.weights.semibold};
  margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: ${MOHJA_DESIGN.COLORS.ACCENT};
  }
`;

const FooterLink = styled(motion(Link))`
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  text-decoration: none;
  font-size: 0.95rem;
  opacity: 0.9;
  display: inline-block;
  position: relative;
  transition: all 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -3px;
    left: 0;
    background-color: ${MOHJA_DESIGN.COLORS.ACCENT};
    transition: width 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};
  }

  &:hover {
    opacity: 1;
    &::before {
      width: 100%;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${MOHJA_DESIGN.SPACING.md}rem;
  margin-top: ${MOHJA_DESIGN.SPACING.md}rem;
`;

const SocialIcon = styled(motion.a)`
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  font-size: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  transition: all 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: ${MOHJA_DESIGN.COLORS.ACCENT};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};
  }

  &:hover {
    &::before {
      width: 150%;
      height: 150%;
      opacity: 0.2;
    }
    color: ${MOHJA_DESIGN.COLORS.WHITE};
    transform: translateY(-5px) scale(1.1);
  }

  /* Specific styles for custom icons */
  .social-icon {
    position: relative;
    z-index: 1;
  }
`;

const TikTokIcon = () => (
  <svg 
    className="social-icon"
    fill="currentColor" 
    viewBox="0 0 24 24" 
    width="1.3rem" 
    height="1.3rem"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.48.67 2.98 1.64 4.01.97 1.01 2.44 1.68 3.84 1.73v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.33 1.07-.33 1.63.02.51.15 1.02.43 1.46.39.62 1.03 1.07 1.71 1.26.66.19 1.39.16 2.03-.05.9-.3 1.63-.93 2.02-1.79.14-.31.23-.64.27-.98.05-1.34.02-2.67.03-4.01.01-2.79-.01-5.58.02-8.37z"/>
  </svg>
);

const FooterBottom = styled.div`
  background-color: ${MOHJA_DESIGN.COLORS.WHITE};
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
  padding: ${MOHJA_DESIGN.SPACING.md}rem 2rem;
  text-align: center;
  font-size: 0.9rem;
`;

const LocationDetails = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  margin-top: ${MOHJA_DESIGN.SPACING.sm}rem;
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  display: flex;
  flex-direction: column;
  gap: ${MOHJA_DESIGN.SPACING.sm}rem;
`;

const LocationLink = styled.a`
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  transition: all 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};
  cursor: pointer;
  width: 100%;
  padding: ${MOHJA_DESIGN.SPACING.sm}rem 0;

  &:hover {
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
    transform: translateX(5px);
  }
`;

const LocationIcon = styled.i`
  color: ${MOHJA_DESIGN.COLORS.ACCENT};
  font-size: 1.5rem;
  width: 40px;
  text-align: center;
  transition: transform 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};

  ${LocationLink}:hover & {
    transform: scale(1.1);
  }
`;

const LocationText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationTitle = styled.span`
  font-weight: ${MOHJA_DESIGN.TYPOGRAPHY.scale.weights.semibold};
  font-size: 1rem;
  margin-bottom: ${MOHJA_DESIGN.SPACING.xs}rem;
`;

const LocationSubtext = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
`;

const LocationDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  font-size: 0.9rem;
  opacity: 0.9;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -${MOHJA_DESIGN.SPACING.sm}rem;
    width: 4px;
    height: 100%;
    background-color: ${MOHJA_DESIGN.COLORS.ACCENT};
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.3s ${MOHJA_DESIGN.ANIMATIONS.easing.standard};
  }

  &:hover::before {
    opacity: 1;
  }

  i {
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
    font-size: 1.2rem;
    width: 25px;
    text-align: center;
    margin-right: ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const QuickLinksSection = styled(FooterSection)`
  i {
    margin-right: ${MOHJA_DESIGN.SPACING.sm}rem;
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
    transition: transform 0.3s ease, color 0.3s ease;
  }

  ${FooterLink}:hover i {
    transform: translateX(5px);
    color: ${MOHJA_DESIGN.COLORS.WHITE};
  }
`;

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: MOHJA_DESIGN.ANIMATIONS.duration.normal
      }
    }
  };

  const handleLinkClick = (to) => {
    // If it's an internal link, scroll to top after navigation
    if (to.startsWith('/') && !to.startsWith('http')) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <FooterWrapper
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <FooterContainer>
          {/* Company Overview */}
          <FooterSection variants={itemVariants}>
            <img 
              src="/images/logo_5.png" 
              alt="Mohja Company" 
              style={{ width: '180px', marginBottom: '1rem' }} 
            />
            <motion.p 
              style={{ 
                fontSize: '0.9rem', 
                lineHeight: 1.6, 
                opacity: 0.9,
                color: MOHJA_DESIGN.COLORS.WHITE 
              }}
              variants={itemVariants}
            >
              Transforming industrial landscapes with innovative equipment 
              solutions, Mohja delivers precision, reliability, and cutting-edge 
              technology across the Middle East.
            </motion.p>
            <SocialLinks>
              {[
                { 
                  Icon: FacebookOutlined, 
                  href: 'https://www.facebook.com/share/1A9FHZ4z6W/', 
                  label: 'Facebook' 
                },
                { 
                  Icon: WhatsAppOutlined, 
                  href: 'https://wa.me/+962790852699', 
                  label: 'WhatsApp' 
                },
                { 
                  Icon: TikTokIcon, 
                  href: 'https://www.tiktok.com/@mohjacompany?_t=ZS-8tkRet3ZEo6&_r=1', 
                  label: 'TikTok' 
                }
              ].map(({ Icon, href, label }, index) => (
                <SocialIcon
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {typeof Icon === 'function' ? (
                    React.isValidElement(Icon()) ? Icon() : <Icon />
                  ) : (
                    <Icon />
                  )}
                </SocialIcon>
              ))}
            </SocialLinks>
          </FooterSection>

          {/* Quick Links */}
          <QuickLinksSection variants={itemVariants}>
            <FooterTitle>Quick Links</FooterTitle>
            {[
              { to: '/', label: 'Home', icon: 'fas fa-home', color: MOHJA_DESIGN.ICON_COLORS.home },
              { to: '/about', label: 'About', icon: 'fas fa-info-circle', color: MOHJA_DESIGN.ICON_COLORS.about },
              { to: '/services', label: 'Services', icon: 'fas fa-cogs', color: MOHJA_DESIGN.ICON_COLORS.services },
              { to: '/equipment', label: 'Equipment', icon: 'fas fa-industry', color: MOHJA_DESIGN.ICON_COLORS.equipment },
              { to: '/contact', label: 'Contact', icon: 'fas fa-envelope', color: MOHJA_DESIGN.ICON_COLORS.email }
            ].map(({ to, label, icon, color }) => (
              <FooterLink 
                key={to} 
                to={to}
                onClick={() => handleLinkClick(to)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={icon} style={{ color }}></i>
                {label}
              </FooterLink>
            ))}
          </QuickLinksSection>

          {/* Services */}
          <FooterSection variants={itemVariants}>
            <FooterTitle>Our Services</FooterTitle>
            {[
              'Construction Equipment',
              'Engineering Solutions',
              'Maintenance Support',
              'Technical Consulting'
            ].map((label) => (
              <div 
                key={label}
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.95rem',
                  marginBottom: '0.5rem',
                  padding: '0.25rem 0'
                }}
              >
                {label}
              </div>
            ))}
          </FooterSection>

          {/* Google Maps Section */}
          <FooterSection variants={itemVariants}>
            <FooterTitle>Our Location</FooterTitle>
            <LocationDetails
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <LocationDetailItem>
                <LocationLink 
                  href="https://maps.app.goo.gl/T4aD62w51XYiV8Yt6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <LocationIcon className="fas fa-map-marker-alt"></LocationIcon>
                  <LocationText>
                    <LocationTitle>Mohja Company</LocationTitle>
                    <LocationSubtext>Jordan Al-Zarqa FreeZone</LocationSubtext>
                  </LocationText>
                </LocationLink>
              </LocationDetailItem>
            </LocationDetails>
          </FooterSection>
        </FooterContainer>
      </FooterWrapper>

      <FooterBottom>
        &copy; {new Date().getFullYear()} Mohja Company For Construction Equipment Trading . All Rights Reserved. 
      </FooterBottom>
    </>
  );
};

export default Footer;