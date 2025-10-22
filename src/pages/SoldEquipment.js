import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { firebaseService } from '../services/firebaseService';
import { Card, Typography, Tag, Button, Select } from 'antd';
import { PictureOutlined, SearchOutlined } from '@ant-design/icons';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import styled from 'styled-components';
import MOHJA_DESIGN from '../styles/design';

const { Title, Text } = Typography;
const { Option } = Select;

const StatusBadge = styled.div`
  position: absolute;
  top: 8px;
  left: -12px;
  padding: 8px 20px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  font-style: italic;
  z-index: 15;
  transform: rotate(-12deg) skewX(-5deg);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 12px 12px 0;
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.25),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.2) 30%, 
      rgba(255, 255, 255, 0.1) 70%, 
      transparent 100%
    );
    border-radius: inherit;
    transform: skewX(5deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -8px;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid;
    transform: translateY(-50%) skewX(5deg);
    filter: drop-shadow(-3px 0 3px rgba(0, 0, 0, 0.3));
  }
  
  &.sold {
    background: linear-gradient(135deg, #e74c3c, #ff4757, #ff6b7a);
    color: white;
    box-shadow: 
      0 10px 20px rgba(231, 76, 60, 0.3),
      0 6px 12px rgba(231, 76, 60, 0.2),
      0 3px 6px rgba(231, 76, 60, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2);
    
    &::after {
      border-right-color: #e74c3c;
    }
  }
  
  &:hover {
    transform: rotate(-12deg) skewX(-5deg) scale(1.05);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.3),
      0 8px 16px rgba(0, 0, 0, 0.2),
      0 4px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  }
`;

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
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [clickedEquipmentId, setClickedEquipmentId] = useState(null);

  const categories = [
    'All Categories',
    'Dozer',
    'Wheel loader',
    'Grader',
    'Excavator',
    'Compactor'
  ];

  useEffect(() => {
    const fetchSoldEquipment = async () => {
      try {
        const items = await firebaseService.getSoldEquipment();
        setSoldEquipment(items);
        setFilteredEquipment(items);
      } catch (error) {
        console.error('Error fetching sold equipment:', error);
      }
    };

    fetchSoldEquipment();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const filtered = soldEquipment.filter(equipment => 
      value === 'All Categories' || 
      (value ? equipment.category === value : true)
    );
    setFilteredEquipment(filtered);
  };

  const openLightbox = (equipment, index = 0) => {
    if (!equipment.images || equipment.images.length === 0) return;

    const lightboxImages = equipment.images.map((img, idx) => {
      const url = img.url || img;
      const isVideo = url.toLowerCase().match(/\.(mp4|mov|avi|webm|mkv)$/);
      
      return {
        src: url,
        alt: `${equipment.name} - ${isVideo ? 'Video' : 'Image'} ${idx + 1}`,
        number: `${idx + 1}/${equipment.images.length}`,
        type: isVideo ? 'video' : 'image'
      };
    });

    setLightboxImages(lightboxImages);
    setLightboxIndex(index);
    setClickedEquipmentId(equipment.id);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    
    // Scroll back to the clicked equipment card
    if (clickedEquipmentId) {
      setTimeout(() => {
        const equipmentCard = document.getElementById(`sold-equipment-card-${clickedEquipmentId}`);
        if (equipmentCard) {
          equipmentCard.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100); // Small delay to ensure lightbox is closed
    }
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

      {/* Filter Section */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '0 20px' }}>
        <SearchOutlined style={{ marginRight: '8px', fontSize: '1rem', color: '#006cac' }} />
        <Select
          placeholder={t('equipmentPage.selectCategoryPlaceholder')}
          onChange={handleCategoryChange}
          style={{ 
            width: '100%', 
            padding: '4px', 
            borderRadius: '8px', 
            border: '1px solid #d9d9d9', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', 
            fontSize: '0.8rem', 
            transition: 'border-color 0.3s ease', 
          }}
          dropdownStyle={{ borderRadius: '8px' }}
          onFocus={(e) => {
            e.target.style.borderColor = '#006cac';
            e.target.style.boxShadow = '0 0 5px rgba(0, 108, 204, 0.5)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d9d9d9';
            e.target.style.boxShadow = 'none';
          }}
        >
          {categories.map(category => (
            <Option key={category} value={category} style={{ fontWeight: '600', fontSize: '0.8rem' }}>{category}</Option>
          ))}
        </Select>
      </div>

      {/* Equipment Grid */}
      <EquipmentGrid id="equipment-gallery">
        {filteredEquipment.length === 0 ? (
          <Text>{t('soldEquipmentPage.noEquipmentFound')}</Text>
        ) : (
          filteredEquipment.map((equipment, index) => {
            // Always show SOLD status in sold equipment page
            return (
              <Card
                key={equipment.id || `sold-equipment-${index}`}
                id={`sold-equipment-card-${equipment.id || `sold-equipment-${index}`}`}
                style={{ width: 300, position: 'relative' }}
                cover={
                  <div style={{ position: 'relative' }}>
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
                    {/* Status Badge - SOLD */}
                    <StatusBadge className={'sold'}>
                      {'SOLD'}
                    </StatusBadge>
                  </div>
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
      <Text style={{whiteSpace: "pre-line"}}>{equipment.description}</Text>
    }
  />
</Card>
            );
          })
        )}
      </EquipmentGrid>

      {/* Lightbox */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          open={lightboxOpen}
          close={closeLightbox}
          slides={lightboxImages}
          index={lightboxIndex}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 3,
            zoomStep: 0.2,
            doubleTapScale: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 50,
            pinchZoomDistanceFactor: 50,
            scrollToZoom: true
          }}
          render={{
            slide: ({ slide, currentIndex }) => {
              if (slide.type === 'video') {
                return (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
                    <video
                      src={slide.src}
                      controls
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                );
              }
              return null; // Let default image rendering handle images
            },
            slideFooter: ({ slide, currentIndex }) => (
              <div 
                style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  padding: '16px 24px', 
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', 
                  color: 'white',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}
              >
                {slide.alt} • {slide.number}
              </div>
            )
          }}
        />
      )}
    </SoldPageContainer>
  );
};

export default SoldEquipment;