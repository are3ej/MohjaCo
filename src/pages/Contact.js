import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  PhoneOutlined, 
  MailOutlined, 
  WhatsAppOutlined,
  FacebookOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { FaTiktok } from 'react-icons/fa';
import MOHJA_DESIGN from '../styles/design';
import { useTranslation } from '../context/TranslationContext'; 

// New Top Contact Bar Styles
const TopContactBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  gap: ${MOHJA_DESIGN.SPACING.lg}rem;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: ${MOHJA_DESIGN.SPACING.sm}rem;
    padding: ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const TopBarContactIcon = styled(motion.a)`
  color: white;
  font-size: 1.5rem;
  margin: 0 ${MOHJA_DESIGN.SPACING.sm}rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: ${MOHJA_DESIGN.COLORS.ACCENT};
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0 ${MOHJA_DESIGN.SPACING.xs}rem;
  }
`;

// Styled Components for Artistic Design
const ContactContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_START}, 
    ${MOHJA_DESIGN.COLORS.GRADIENT_END}
  );
  padding: ${MOHJA_DESIGN.SPACING.xl}rem;
  font-family: ${MOHJA_DESIGN.TYPOGRAPHY.fontFamily};
`;

const ContactWrapper = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 1200px;
  width: 100%;
  display: flex;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 95%;
    margin: 0 auto;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  background: ${MOHJA_DESIGN.COLORS.PRIMARY};
  color: white;
  padding: ${MOHJA_DESIGN.SPACING.xl}rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem;
    text-align: center;
  }
`;

const ContactTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: ${MOHJA_DESIGN.SPACING.lg}rem;
  font-weight: 700;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ContactDescription = styled.p`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: ${MOHJA_DESIGN.SPACING.xl}rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContactMethod = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: ${MOHJA_DESIGN.SPACING.md}rem;
  cursor: pointer;
  padding: ${MOHJA_DESIGN.SPACING.sm}rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  word-break: break-all;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(10px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: ${MOHJA_DESIGN.SPACING.sm}rem;
    
    &:hover {
      transform: none;
    }
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-right: ${MOHJA_DESIGN.SPACING.md}rem;
  color: white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
  }
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
  
  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: white;
    word-break: break-word;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    word-break: break-all;
  }

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Contact = () => {
  const { t } = useTranslation();
  const COMPANY_USA_PHONE_NUMBER = '+1-301-494-7165';

  const topContactMethods = [
    {
      icon: <MailOutlined />,
      action: () => window.location.href = `mailto:osama8821070@yahoo.com?subject=Inquiry%20to%20Mohja%20Company&body=Dear%20Mohja%20Company%20Team,%0A%0AI would like to...`
    },
    {
      icon: <PhoneOutlined />,
      action: () => window.open('tel:+962790852699')
    },
    {
      icon: <WhatsAppOutlined />,
      action: () => window.open('https://wa.me/+962790852699')
    },
    {
      icon: <FacebookOutlined />,
      action: () => window.open('https://www.facebook.com/MohjaCompany')
    },
    {
      icon: <FaTiktok />,
      action: () => window.open('https://www.tiktok.com/@mohjacompany?_t=ZS-8tkRet3ZEo6&_r=1')
    },
    {
      icon: <MessageOutlined />,
      action: () => window.open('sms:+962790852699')
    }
  ];

  const contactMethods = [
    {
      icon: <PhoneOutlined />,
      title: t('contactPage.callUsOsama'),
      details: '+962790852699',
      action: () => window.open('tel:+962790852699')
    },
    {
      icon: <PhoneOutlined />,
      title: t('contactPage.callUsIbraheem'),
      details: '+962798957425',
      action: () => window.open('tel:+962798957425')
    },
    {
      icon: <PhoneOutlined />,
      title: t('contactPage.callUSA'),
      details: COMPANY_USA_PHONE_NUMBER,
      action: () => window.open(`tel:${COMPANY_USA_PHONE_NUMBER}`)
    },
    {
      icon: <MailOutlined />,
      title: t('contactPage.email'),
      details: 'osama8821070@yahoo.com',
      action: () => {
        window.location.href = `mailto:osama8821070@yahoo.com?subject=Inquiry%20to%20Mohja%20Company&body=Dear%20Mohja%20Company%20Team,%0A%0AI would like to...`;
      }
    }
  ];

  return (
    <>
      <TopContactBar className="top-contact-bar">
        {topContactMethods.map((method, index) => (
          <TopBarContactIcon
            key={index}
            onClick={method.action}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="top-contact-icon"
          >
            {method.icon}
          </TopBarContactIcon>
        ))}
      </TopContactBar>

      <ContactContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="contact-container-responsive"
      >
        <ContactWrapper
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <ContactInfo>
            <ContactTitle>{t('contactPage.getInTouch')}</ContactTitle>
            <ContactDescription>
              {t('contactPage.contactDescription')}
            </ContactDescription>

            {contactMethods.map((method, index) => (
              <ContactMethod
                key={method.title}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                onClick={method.action}
              >
                <ContactIcon>{method.icon}</ContactIcon>
                <ContactText>
                  <h3>{method.title}</h3>
                  <p>{method.details}</p>
                </ContactText>
              </ContactMethod>
            ))}
          </ContactInfo>
        </ContactWrapper>
      </ContactContainer>
    </>
  );
};

export default Contact;