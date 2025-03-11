import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  CheckCircleOutlined,
  TeamOutlined,
  GlobalOutlined,
  SafetyOutlined,
  TrophyOutlined,
  BulbOutlined
} from '@ant-design/icons';
import { useTranslation } from '../context/TranslationContext';
import LanguageToggle from '../components/LanguageToggle';

// Design System
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
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
  padding-top: 0;

  @media (max-width: 768px) {
    padding-top: 0;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  width: 90%;  
  margin: 0 auto;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem ${MOHJA_DESIGN.SPACING.lg}rem;

  @media (max-width: 1024px) {
    width: 95%;
    padding: ${MOHJA_DESIGN.SPACING.lg}rem ${MOHJA_DESIGN.SPACING.md}rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: ${MOHJA_DESIGN.SPACING.md}rem ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const HeroSection = styled.section`
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

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  @media (max-width: 1200px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
  }

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem 0.5rem;
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
  width: 100%;
  text-align: center;
  align-self: center;

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
  width: 100%;
  text-align: center;
  align-self: center;

  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 90%;
    margin: 0 auto ${MOHJA_DESIGN.SPACING.md}rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: ${MOHJA_DESIGN.TYPOGRAPHY.scale.weights.bold};
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  margin-bottom: ${MOHJA_DESIGN.SPACING.lg}rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ValueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${MOHJA_DESIGN.SPACING.lg}rem;
  background-color: ${MOHJA_DESIGN.COLORS.WHITE};
  padding: ${MOHJA_DESIGN.SPACING.xl}rem;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05);

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${MOHJA_DESIGN.SPACING.md}rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    padding: ${MOHJA_DESIGN.SPACING.lg}rem ${MOHJA_DESIGN.SPACING.md}rem;
  }
`;

const ValueCard = styled(motion.div)`
  background: ${MOHJA_DESIGN.COLORS.BACKGROUND};
  border-radius: 12px;
  padding: ${MOHJA_DESIGN.SPACING.lg}rem;
  text-align: center;
  transition: all 0.3s ease;

  .icon {
    font-size: 3rem;
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
    margin-bottom: ${MOHJA_DESIGN.SPACING.md}rem;
  }

  h3 {
    font-size: 1.25rem;
    color: ${MOHJA_DESIGN.COLORS.PRIMARY};
    margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
  }

  @media (max-width: 576px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem;

    .icon {
      font-size: 2.5rem;
      margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
    }

    h3 {
      font-size: 1.1rem;
    }

    p {
      font-size: 0.9rem;
    }
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
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
const About = () => {
  const { t, language } = useTranslation();
  const companyValues = [
    {
      icon: <CheckCircleOutlined />,
      title: t('qualityAssurance'),
      description: t('qualityAssuranceDesc')
    },
    {
      icon: <TeamOutlined />,
      title: t('expertCollaboration'),
      description: t('expertCollaborationDesc')
    },
    {
      icon: <GlobalOutlined />,
      title: t('globalStandards'),
      description: t('globalStandardsDesc')
    },
    {
      icon: <TrophyOutlined />,
      title: t('continuousExcellence'),
      description: t('continuousExcellenceDesc')
    },
    {
      icon: <SafetyOutlined />,
      title: t('safetyFirst'),
      description: t('safetyFirstDesc')
    },
    {
      icon: <BulbOutlined />,
      title: t('innovativeSolutions'),
      description: t('innovativeSolutionsDesc')
    }
  ];

  return (
    <PageContainer dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <HeroSection>
        <HeroContainer>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroTitle>   
              {t('constructionExcellence')}
            </HeroTitle>
            <HeroSubtitle>
              {t('aboutDescription')}
            </HeroSubtitle>
          </motion.div>
        </HeroContainer>
      </HeroSection>

      <SectionContainer>
        <SectionTitle>{t('coreValues')}</SectionTitle>
        <ValueGrid>
          {companyValues.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
            >
              <div className="icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </ValueCard>
          ))}
        </ValueGrid>
      </SectionContainer>

      <SectionContainer style={{ 
        backgroundColor: MOHJA_DESIGN.COLORS.WHITE,
        borderRadius: '12px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.05)'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle>{t('professionalCommitment')}</SectionTitle>
          <p style={{ 
            textAlign: 'center', 
            maxWidth: '800px', 
            margin: '0 auto', 
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: MOHJA_DESIGN.COLORS.TEXT_SECONDARY
          }}>
           {t('professionalCommitmentDesc')}
          </p>
        </motion.div>
      </SectionContainer>

      <SectionContainer style={{ 
        background: `linear-gradient(135deg, ${MOHJA_DESIGN.COLORS.PRIMARY}, ${MOHJA_DESIGN.COLORS.ACCENT})`, 
        borderRadius: '12px',
        color: MOHJA_DESIGN.COLORS.WHITE,
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: `${MOHJA_DESIGN.SPACING.md}rem` 
          }}>
              {t('transformOperations')}
          </h2>
          <p style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            marginBottom: `${MOHJA_DESIGN.SPACING.lg}rem`,
            fontSize: '1.1rem'
          }}>
             {t('transformOperationsDesc')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/services" 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: `${MOHJA_DESIGN.SPACING.sm}rem`,
                padding: `${MOHJA_DESIGN.SPACING.sm}rem ${MOHJA_DESIGN.SPACING.md}rem`,
                backgroundColor: MOHJA_DESIGN.COLORS.PRIMARY,
                color: MOHJA_DESIGN.COLORS.WHITE,
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: MOHJA_DESIGN.TYPOGRAPHY.scale.weights.semibold,
                fontSize: `${MOHJA_DESIGN.TYPOGRAPHY.scale.sizes.base}rem`,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <GlobalOutlined style={{ fontSize: '1rem', marginRight: '0.5rem' }} />
              {t('ourServices')}
            </Link>
          </motion.div>
        </motion.div>
      </SectionContainer>

      {/* Spacer Section */}
      <div style={{ 
        height: `${MOHJA_DESIGN.SPACING.xl * 2}rem`, 
        backgroundColor: MOHJA_DESIGN.COLORS.BACKGROUND 
      }} />
    </PageContainer>
  );
};

export default About;
