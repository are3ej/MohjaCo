// src/components/LanguageToggle.js
import React from 'react';
import { motion } from 'framer-motion';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from '../context/TranslationContext';
import styled from 'styled-components';

const StyledLanguageToggle = styled(motion.button)`
  background: transparent;
  border: 2px solid ${props => props.theme.colors?.white || '#fff'};
  color: ${props => props.theme.colors?.white || '#fff'};
  padding: 16px 23px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.language === 'ar' && `
    font-family: 'Tajawal', sans-serif;
  `}
`;

const LanguageToggle = () => {
  const { language, toggleLanguage } = useTranslation();
  const handleClick = () => {
    toggleLanguage();
    console.log('LanguageToggle button clicked');
    console.log('Button click registered');
  };

  return (
    <StyledLanguageToggle onClick={handleClick} language={language} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <GlobalOutlined />
      {language === 'en' ? 'عربي' : 'English'}
    </StyledLanguageToggle>
  );
};

export default LanguageToggle;