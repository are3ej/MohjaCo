import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { firebaseService } from '../services/firebaseService';
import { Card, Typography, Tag, Button } from 'antd';
import { PictureOutlined, SearchOutlined } from '@ant-design/icons';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import styled from 'styled-components';
import MOHJA_DESIGN from '../styles/design';

const { Title, Text } = Typography;

// Styled Components
const SoldPageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
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

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.lg}rem 1rem;
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

  @media (max-width: 768px) {
    padding: ${MOHJA_DESIGN.SPACING.md}rem 1rem;
  }
`;

const HeroTitle = styled(Title)`
  color: ${MOHJA_DESIGN.COLORS.WHITE} !important;
  font-size: 3.5rem !important;
  font-weight: 700 !important;
  margin-bottom: ${MOHJA_DESIGN.SPACING.md}rem !important;
  line-height: 1.2;
  letter-spacing: -1px;

  @media (max-width: 1200px) {
    font-size: 3rem !important;
  }

  @media (max-width: 992px) {
    font-size: 2.5rem !important;
  }

  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;

const HeroSubtitle = styled(Text)`
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 1.2rem !important;
  display: block;
  margin-bottom: ${MOHJA_DESIGN.SPACING.lg}rem !important;
  line-height: 1.6;
  max-width: 700px;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 1.1rem !important;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem !important;
    max-width: 90%;
  }
`;

const HeroButton = styled(Button)`
  background: white;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
    color: ${MOHJA_DESIGN.COLORS.SECONDARY};
  }
`;

const EquipmentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
`;

const SoldEquipment = () => {
  const { t } = useTranslation();
  const [soldEquipment, setSoldEquipment] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchSoldEquipment = async () => {
      try {
        const items = await firebaseService.getSoldEquipment();
        setSoldEquipment(items);
      } catch (error) {
        console.error('Error fetching sold equipment:', error);
      }
    };

    fetchSoldEquipment();
  }, []);

  const openLightbox = (equipment, index = 0) => {
    if (!equipment.images || equipment.images.length === 0) return;

    const lightboxImages = equipment.images.map((img, idx) => ({
      src: img.url || img,
      alt: `${equipment.name} - Image ${idx + 1}`,
      number: `${idx + 1}/${equipment.images.length}`,
    }));

    setLightboxImages(lightboxImages);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <SoldPageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroTitle>{t('soldEquipmentPage.heroTitle')}</HeroTitle>
          <HeroSubtitle>
            {t('soldEquipmentPage.heroSubtitle')}
          </HeroSubtitle>
          <HeroButton
            icon={<SearchOutlined />}
            onClick={() => {
              const gallerySection = document.getElementById('equipment-gallery');
              if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('soldEquipmentPage.browseEquipment')}
          </HeroButton>
        </HeroContainer>
      </HeroSection>

      {/* Equipment Grid */}
      <EquipmentGrid id="equipment-gallery">
        {soldEquipment.length === 0 ? (
          <Text>{t('soldEquipmentPage.noEquipmentFound')}</Text>
        ) : (
          soldEquipment.map((equipment, index) => (
            <Card
  key={equipment.id || `sold-equipment-${index}`}
  style={{ width: 300 }}
  cover={
    <img
      alt={equipment.name}
      src={
        equipment.images?.[0]?.url || 
        equipment.images?.[0] || 
        '/images/equipment-placeholder.jpg'
      }
      style={{ height: 200, objectFit: 'cover' }}
      onError={(e) => {
        e.target.src = '/images/equipment-placeholder.jpg'; // Fallback if image fails to load
      }}
      onClick={() => openLightbox(equipment)}
    />
  }
  actions={[
    <Button
      type="primary"
      icon={<PictureOutlined />}
      onClick={() => openLightbox(equipment)}
    >
      {t('soldEquipmentPage.viewGallery')}
    </Button>,
  ]}
>
  <Card.Meta
    title={equipment.name}
    description={
      <>
        <Text>{equipment.description}</Text>
        <br />
        <Tag color="red">{equipment.status?.toUpperCase()}</Tag>
      </>
    }
  />
</Card>
          ))
        )}
      </EquipmentGrid>

      {/* Lightbox */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={lightboxIndex}
          plugins={[Zoom]}
        />
      )}
    </SoldPageContainer>
  );
};

export default SoldEquipment;