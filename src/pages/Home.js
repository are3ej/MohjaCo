import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Button } from 'antd';
import styled from 'styled-components';
import { 
  RocketOutlined, 
  ToolOutlined, 
  SafetyCertificateOutlined, 
  CheckCircleOutlined, 
  TeamOutlined, 
  GlobalOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { useTranslation } from '../context/TranslationContext';
import LanguageToggle from '../components/LanguageToggle';

const { Title } = Typography;

// Professional Design System
const MOHJA_DESIGN = {
  TYPOGRAPHY: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    scale: {
      sizes: {
        small: 0.875,
        base: 1,
        medium: 1.125,
        large: 1.5,
        xlarge: 2.5
      },
      weights: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700
      }
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

// Styled Components
const PageContainer = styled.div`
  font-family: ${MOHJA_DESIGN.TYPOGRAPHY.fontFamily};
  background-color: ${MOHJA_DESIGN.COLORS.BACKGROUND};
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-behavior: smooth;
  overscroll-behavior-x: none;
`;

const HeroSection = styled.section`
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_START}, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_END}
  );
  color: ${MOHJA_DESIGN.COLORS.WHITE};
  position: relative;
  overflow: hidden;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem 2rem;
  text-align: center;

  @media (max-width: 1200px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
  }

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem 0.5rem;
  }
`;

const HeroContainer = styled.div`
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

const HeroContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 3;

  @media (max-width: 992px) {
    max-width: 90%;
  }

  @media (max-width: 576px) {
    max-width: 95%;
    padding: 0 ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const HeroTitle = styled.h1`
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

const HeroSubtitle = styled.p`
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

const HeroCTA = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: ${MOHJA_DESIGN.SPACING.md}rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const CTAButton = styled(Button)`
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 250px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }
`;

const ServiceSection = styled.section`
  padding: ${MOHJA_DESIGN.SPACING.xl}rem 2rem;
  background-color: ${MOHJA_DESIGN.COLORS.BACKGROUND};

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
  }
`;

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${MOHJA_DESIGN.SPACING.lg}rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${MOHJA_DESIGN.SPACING.md}rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: ${MOHJA_DESIGN.COLORS.WHITE};
  border-radius: 16px;
  padding: ${MOHJA_DESIGN.SPACING.lg}rem;
  text-align: center;
  box-shadow: 
    0 15px 35px rgba(13, 71, 161, 0.05),
    0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  will-change: transform, box-shadow;
  
  @media (max-width: 576px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem;
  }

  .icon-container {
    width: 80px;
    height: 80px;
    background: linear-gradient(
      135deg, 
      ${MOHJA_DESIGN.COLORS.PRIMARY}, 
      ${MOHJA_DESIGN.COLORS.ACCENT}
    );
    color: ${MOHJA_DESIGN.COLORS.WHITE};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${MOHJA_DESIGN.SPACING.md}rem;
    font-size: 2.5rem;
    box-shadow: 0 10px 25px rgba(21, 101, 192, 0.2);
    transition: all 0.3s ease;

    @media (max-width: 576px) {
      width: 60px;
      height: 60px;
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    color: ${MOHJA_DESIGN.COLORS.PRIMARY};
    margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;

    @media (max-width: 576px) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 0.95rem;
    color: ${MOHJA_DESIGN.COLORS.TEXT_SECONDARY};
    line-height: 1.6;

    @media (max-width: 576px) {
      font-size: 0.85rem;
    }
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(13, 71, 161, 0.1),
      0 10px 20px rgba(0,0,0,0.08);
  }
`;

const LanguageToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

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
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Home = () => {
  const { t, language } = useTranslation();

  const services = [
    { 
      icon: <RocketOutlined />, 
      title: t('strategicSourcing'), 
      description: t('strategicSourcingDesc')
    },
    { 
      icon: <ToolOutlined />, 
      title: t('technicalExpertise'), 
      description: t('technicalExpertiseDesc')
    },
    { 
      icon: <SafetyCertificateOutlined />, 
      title: t('qualityAssurance'), 
      description: t('qualityAssuranceDesc')
    }
  ];

  const features = [
    { 
      icon: <CheckCircleOutlined />, 
      title: t('freeZoneSolutions'),
      description: t('freeZoneSolutionsDesc')
    },
    { 
      icon: <TeamOutlined />, 
      title: t('strategicPartnerships'),
      description: t('strategicPartnershipsDesc')
    },
    { 
      icon: <GlobalOutlined />, 
      title: t('globalLogistics'),
      description: t('globalLogisticsDesc')
    }
  ];

  return (
    <PageContainer dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <HeroTitle>
            {t('transformingConstruction')}
            </HeroTitle>
            <HeroSubtitle>
            {t('mohjaDescription')}
            </HeroSubtitle>
            <HeroCTA>
              <CTAButton 
                type="primary" 
                size="large"
                icon={<ToolOutlined />}
                onClick={() => window.location.href = '/equipment'}
              >
                {t('ourEquipment')}
              </CTAButton>
              <CTAButton 
                type="default" 
                size="large"
                icon={<PhoneOutlined />}
                onClick={() => window.location.href = '/contact'}
              >
                {t('contactUs')}
              </CTAButton>
            </HeroCTA>
          </HeroContent>
        </HeroContainer>
      </HeroSection>

      <ServiceSection style={{ backgroundColor: MOHJA_DESIGN.COLORS.BACKGROUND }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Title 
            level={2} 
            style={{ 
              textAlign: 'center', 
              color: MOHJA_DESIGN.COLORS.PRIMARY,
              marginBottom: '2rem' 
            }}
          >
            {t('ourServices')}
          </Title>
          
          <ServiceGrid>
            {services.map((service, index) => (
              <ServiceCard
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                key={index}
              >
                <div className="icon-container">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </motion.div>
      </ServiceSection>

      <ServiceSection style={{ backgroundColor: MOHJA_DESIGN.COLORS.BACKGROUND }}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Title 
            level={2} 
            style={{ 
              textAlign: 'center', 
              color: MOHJA_DESIGN.COLORS.PRIMARY,
              marginBottom: '2rem' 
            }}
          >
            {t('whyChooseUs')}
          </Title>
          
          <ServiceGrid>
            {features.map((feature, index) => (
              <ServiceCard
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                key={index}
              >
                <div className="icon-container">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </ServiceCard>
            ))}
          </ServiceGrid>
        </motion.div>
      </ServiceSection>
    </PageContainer>
  );
};

export default Home;
