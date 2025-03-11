import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaTruck, FaTools, FaCogs, FaHandshake, FaShippingFast, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import MOHJA_DESIGN from '../styles/design';
import { useTranslation } from '../context/TranslationContext';
import LanguageToggle from '../components/LanguageToggle';

// Animations
const cardHoverAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Services = () => {
  const [activeService, setActiveService] = useState(null);
  const { language, t } = useTranslation();

  const services = [
    {
      id: 1,
      icon: FaTruck,
      title: 'services.supply.title',
      description: 'services.supply.description',
      link: '/contact',
      color: '#4A044E'
    },
    {
      id: 2,
      icon: FaTools,
      title: 'services.maintenance.title',
      description: 'services.maintenance.description',
      link: '/contact',
      color: '#065F46'
    },
    {
      id: 3,
      icon: FaCogs,
      title: 'services.engineering.title',
      description: 'services.engineering.description',
      link: '/contact',
      color: '#1E3A8A'
    },
    {
      id: 4,
      icon: FaHandshake,
      title: 'services.consulting.title',
      description: 'services.consulting.description',
      link: '/contact',
      color: '#991B1B'
    },
    {
      id: 5,
      icon: FaShippingFast,
      title: 'services.support.title',
      description: 'services.support.description',
      link: '/contact',
      color: '#4A044E'
    },
    {
      id: 6,
      icon: FaGraduationCap,
      title: 'services.innovation.title',
      description: 'services.innovation.description',
      link: '/contact',
      color: '#065F46'
    }
  ];

  return (
    <ServicesPage>
      <PageHeader>
        <HeaderContent>
          <Title>{t('integratedServices')}</Title>
          <Subtitle>{t('solutionsSubtitle')}</Subtitle>
        </HeaderContent>
      </PageHeader>

      <ServicesGrid dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {services.map((service) => (
          <ServiceCard 
            key={service.id}
            color={service.color}
            onMouseEnter={() => setActiveService(service.id)}
            onMouseLeave={() => setActiveService(null)}
            isActive={activeService === service.id}
          >
            <ServiceIcon color={service.color}>
              <service.icon />
            </ServiceIcon>
            <ServiceTitle>{t(service.title)}</ServiceTitle>
            <ServiceDescription>{t(service.description)}</ServiceDescription>
            <LearnMoreLink to={service.link}>
              {t('learnMore')}
              <ArrowIcon />
            </LearnMoreLink>
          </ServiceCard>
        ))}
      </ServicesGrid>

      <CTASection style={{ marginBottom: '4rem' }}>
        <CTAContent>
          <CTATitle>{t('readyToElevate')}</CTATitle>
          <CTADescription>
            {t('transformDescription')}
          </CTADescription>
          <CTAButtons>
            <PrimaryButton 
              to="/equipment" 
              style={{ 
                backgroundColor: MOHJA_DESIGN.COLORS.WHITE, 
                color: MOHJA_DESIGN.COLORS.PRIMARY,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                zIndex: 100,
              }}
            >
              <FaTools style={{ marginRight: '0.5rem' }} />
              {t('ourEquipment')}
            </PrimaryButton>
            <PrimaryButton 
              to="/contact" 
              style={{ 
                backgroundColor: MOHJA_DESIGN.COLORS.ACCENT, 
                color: MOHJA_DESIGN.COLORS.WHITE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                zIndex: 100
              }}
            >
              <FaHandshake style={{ marginRight: '0.5rem' }} />
              {t('contactUs')}
            </PrimaryButton>
          </CTAButtons>
        </CTAContent>
      </CTASection>
    </ServicesPage>
  );
};

// Styled Components
const ServicesPage = styled.div`
  background-color: ${MOHJA_DESIGN.COLORS.BACKGROUND};
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
  font-family: 'Inter', sans-serif;
  padding-top: 0;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const PageHeader = styled.section`
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_START}, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_END}
  );
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  text-align: center;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
  }

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem 0.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem 2rem;

  @media (max-width: 1200px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
  }

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  margin-bottom: ${MOHJA_DESIGN.SPACING.md}rem;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -1px;
  max-width: 900px;

  @media (max-width: 1200px) {
    font-size: 3rem;
  }

  @media (max-width: 992px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    max-width: 90%;
    margin: 0 auto ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  margin-bottom: ${MOHJA_DESIGN.SPACING.lg}rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 90%;
    margin: 0 auto ${MOHJA_DESIGN.SPACING.md}rem;
  }
`;

const ServicesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 2rem 1rem;
  }
`;

const ServiceCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  transform: ${props => props.isActive ? 'translateY(-15px)' : 'translateY(0)'};
  border-top: 5px solid ${props => props.color};

  @media (max-width: 768px) {
    padding: 1.5rem;
    transform: none;
  }

  &:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    animation: ${cardHoverAnimation} 1s ease infinite;
  }
`;

const ServiceIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.color};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 0.9rem;
  color: ${MOHJA_DESIGN.COLORS.TEXT_SECONDARY};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const LearnMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
  }
`;

const ArrowIcon = styled(FaArrowRight)`
  margin-right: 0.5rem;
`;

const CTASection = styled.section`
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.PRIMARY}, 
    ${MOHJA_DESIGN.COLORS.ACCENT}
  );
  color: white;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(30, 58, 138, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(59, 130, 246, 0.1),
      rgba(30, 58, 138, 0.1)
    );
    opacity: 0.5;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.7;
  letter-spacing: 0.5px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  position: relative;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(
      to right, 
      rgba(255, 255, 255, 0.5), 
      transparent
    );
    opacity: 0.7;
  }

  @media (max-width: 1024px) {
    font-size: 1rem;
    max-width: 90%;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    margin-bottom: 1rem;
    text-align: center;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const LanguageToggleWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

export default Services;