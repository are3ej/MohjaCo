import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa'; 
import { useTranslation } from '../context/TranslationContext';  
import { 
  Modal,  
  Typography, 
  Carousel, 
  Button, 
  Select, 
  Tag, 
  message,
  Pagination // Import Pagination
} from 'antd';
import { 
  SearchOutlined, 
  ZoomInOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  PictureOutlined
} from '@ant-design/icons';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { firebaseService } from '../services/firebaseService';
import '../styles/Equipment.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import MOHJA_DESIGN from '../styles/design';

const { Option } = Select;

const EquipmentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: ${MOHJA_DESIGN.SPACING.md}rem;
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  width: 100%;
  box-sizing: border-box;
`;

const EquipmentCardWrapper = styled(motion.div)`
  perspective: 1200px;
  transform-style: preserve-3d;
`;

const EquipmentCard = styled(motion.div)`
  background: var(--background-color-light);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: var(--card-shadow);
  margin: ${MOHJA_DESIGN.SPACING.sm}rem;
  width: 250px;
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(
    135deg, 
    ${MOHJA_DESIGN.COLORS.BACKGROUND_LIGHT}, 
    #f5f7fa
  );
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: rgba(0,0,0,0.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  ${EquipmentCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImageNumberOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 10;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
`;

const GalleryItemImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const GalleryItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: brightness(0.9);
`;

const GalleryItemCard = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.05),
    0 5px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  perspective: 1000px;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(
      to right, 
      ${MOHJA_DESIGN.COLORS.PRIMARY}, 
      ${MOHJA_DESIGN.COLORS.SECONDARY}
    );
    z-index: 10;
    transition: background 0.3s ease;
  }

  &:hover {
    transform: 
      rotateX(3deg) 
      translateY(-15px) 
      scale(1.03);
    box-shadow: 
      0 25px 45px rgba(0, 0, 0, 0.1),
      0 10px 20px rgba(0, 0, 0, 0.05);

    &::before {
      background: linear-gradient(
        to right, 
        ${MOHJA_DESIGN.COLORS.SECONDARY}, 
        ${MOHJA_DESIGN.COLORS.PRIMARY}
      );
    }

    ${GalleryItemImage} {
      transform: scale(1.05);
      filter: brightness(1);
    }

    ${ImageNumberOverlay} {
      background: rgba(0,0,0,0.8);
      transform: scale(1.05);
    }
  }
`;

const UpdatedImageNumberOverlay = styled(ImageNumberOverlay)`
  ${GalleryItemCard}:hover & {
    background: rgba(0,0,0,0.8);
    transform: scale(1.05);
  }
`;

const CardDetails = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(
    to bottom, 
    white 50%, 
    rgba(240, 240, 240, 0.1) 100%
  );
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  margin-bottom: 10px;
  transition: color 0.3s ease;
  
  ${EquipmentCard}:hover & {
    color: ${MOHJA_DESIGN.COLORS.SECONDARY};
  }
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const CardTag = styled.span`
  background-color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: ${MOHJA_DESIGN.SPACING.xs}rem;
`;

const ActionButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${MOHJA_DESIGN.SPACING.xs}rem;
  border-radius: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const DetailsModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MOHJA_DESIGN.SPACING.md}rem;
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  background: linear-gradient(
    to bottom, 
    ${MOHJA_DESIGN.COLORS.BACKGROUND_LIGHT} 0%, 
    white 100%
  );
  border-radius: 16px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
  margin-bottom: ${MOHJA_DESIGN.SPACING.md}rem;
`;

const ModalTitle = styled(Typography.Title)`
  margin: 0 !important;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY} !important;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  background: white;
  border-radius: 8px;
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
`;

const DetailsLabel = styled(Typography.Text)`
  font-weight: 600;
  color: ${MOHJA_DESIGN.COLORS.SECONDARY};
`;

const DetailsValue = styled(Typography.Text)`
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
`;

const ImageGallerySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${MOHJA_DESIGN.SPACING.sm}rem;
  margin-top: ${MOHJA_DESIGN.SPACING.md}rem;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${MOHJA_DESIGN.SPACING.lg}rem;
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  perspective: 1000px;
`;

const GalleryItemDetails = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: linear-gradient(
    to bottom, 
    white 50%, 
    rgba(240, 240, 240, 0.1) 100%
  );
`;

const GalleryItemNumberOverlay = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(
    to right, 
    ${MOHJA_DESIGN.COLORS.PRIMARY}, 
    ${MOHJA_DESIGN.COLORS.SECONDARY}
  );
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  letter-spacing: 0.5px;
  transform: translateZ(20px);
`;

const EquipmentCardDetails = styled.div`
  padding: ${MOHJA_DESIGN.SPACING.md}rem;
  display: flex;
  flex-direction: column;
  gap: ${MOHJA_DESIGN.SPACING.xs}rem;
  background: linear-gradient(
    to bottom, 
    rgba(255,255,255,0.9) 0%, 
    ${MOHJA_DESIGN.COLORS.BACKGROUND_LIGHT} 100%
  );
  border-top: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      to right, 
      ${MOHJA_DESIGN.COLORS.PRIMARY}, 
      ${MOHJA_DESIGN.COLORS.SECONDARY}
    );
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  ${GalleryItemCard}:hover &::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const EquipmentCardDetailItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${MOHJA_DESIGN.SPACING.xs}rem;
  padding: ${MOHJA_DESIGN.SPACING.xs}rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(
      to right, 
      ${MOHJA_DESIGN.COLORS.PRIMARY}, 
      ${MOHJA_DESIGN.COLORS.SECONDARY}
    );
    transition: width 0.3s ease;
  }

  &:hover {
    background: rgba(0,0,0,0.02);
    
    &::before {
      width: 100%;
    }
  }
`;

const EquipmentCardLabel = styled(Typography.Text)`
  font-weight: 600;
  color: ${MOHJA_DESIGN.COLORS.SECONDARY};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: ${MOHJA_DESIGN.SPACING.sm}rem;
  min-width: 120px;
  flex-shrink: 0;
  transition: color 0.3s ease;

  ${EquipmentCardDetailItem}:hover & {
    color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  }
`;

const EquipmentCardValue = styled(Typography.Text)`
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
  font-size: 0.9rem;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.3s ease;

  ${EquipmentCardDetailItem}:hover & {
    color: ${MOHJA_DESIGN.COLORS.SECONDARY};
  }
`;

const DetailsButton = styled(Button)`
  margin-top: auto;
  border-radius: 0 0 20px 20px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background: linear-gradient(
    to right, 
    ${MOHJA_DESIGN.COLORS.PRIMARY}, 
    ${MOHJA_DESIGN.COLORS.SECONDARY}
  );
  border: none;
  color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 20px rgba(0,0,0,0.15);
    background: linear-gradient(
      to right, 
      ${MOHJA_DESIGN.COLORS.SECONDARY}, 
      ${MOHJA_DESIGN.COLORS.PRIMARY}
    );
  }
`;

const CategoryTag = styled(Tag)`
  background-color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  color: white;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const DetailTitle = styled(Typography.Title)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  margin-bottom: 10px;
`;

const DetailDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ModalImageCarousel = styled(Carousel)`
  max-width: 400px;
  margin: 0 auto;
`;

const EquipmentCardTitle = styled(Typography.Title)`
  margin: 0 !important;
  font-size: 1.2rem !important;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY} !important;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700 !important;

  ${GalleryItemCard}:hover & {
    color: ${MOHJA_DESIGN.COLORS.SECONDARY} !important;
  }
`;

const EquipmentCardDescription = styled(Typography.Paragraph)`
  margin: 0 !important;
  color: ${MOHJA_DESIGN.COLORS.TEXT_PRIMARY};
  font-size: 0.9rem;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 54px;  // Consistent height for description
`;

const EquipmentCardSpecifications = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${MOHJA_DESIGN.SPACING.xs}rem;
  margin-top: ${MOHJA_DESIGN.SPACING.sm}rem;
  margin-bottom: ${MOHJA_DESIGN.SPACING.sm}rem;
`;

const SpecificationTag = styled(Tag)`
  background-color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.7rem;
  padding: 2px 8px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

const HeroTitle = styled(Typography.Title)`
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

const HeroSubtitle = styled(Typography.Text)`
  color: rgba(255,255,255,0.8) !important;
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

const HeroActionButton = styled(Button)`
  background: white;
  color: ${MOHJA_DESIGN.COLORS.PRIMARY};
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.3);
    color: ${MOHJA_DESIGN.COLORS.SECONDARY};
  }
`;

const EquipmentPageContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

const categories = [
  'All Categories',
  'Dozer',
  'Wheel loader',
  'Grader',
  'Excavator',
  'Compactor'
];

const categoryIcons = {
  'Dozer': <SearchOutlined />,
  'Wheel loader': <ZoomInOutlined />, 
  'Grader': <InfoCircleOutlined />, 
  'Excavator': <PictureOutlined />, 
  'Compactor': <CloseOutlined />
};

const Equipment = () => {
  const { t } = useTranslation();
  const _navigate = useNavigate();
  
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentData, setEquipmentData] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [selectedEquipmentForModal, setSelectedEquipmentForModal] = useState(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEquipment.slice(indexOfFirstItem, indexOfLastItem);

  const openLightbox = (equipment) => {
    if (!equipment.images || equipment.images.length === 0) return;

    const lightboxImages = equipment.images.map((img, index) => {
      const url = img.url || img;
      const isVideo = url.toLowerCase().match(/\.(mp4|mov|avi|webm|mkv)$/);
      
      return {
        src: url,
        alt: `${equipment.name} - ${isVideo ? 'Video' : 'Image'} ${index + 1}`,
        number: `${index + 1}/${equipment.images.length}`,
        type: isVideo ? 'video' : 'image'
      };
    });

    setLightboxImages(lightboxImages);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const EquipmentDetailsModal = () => {
    if (!selectedEquipmentForModal) return null;

    const { 
      name, 
      category, 
      description, 
      images, 
      specifications = {}, 
      manufacturer,
      serialNumber
    } = selectedEquipmentForModal;

    return (
      <Modal
        title={null}
        visible={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button 
            key="view-gallery" 
            type="primary" 
            icon={<PictureOutlined />}
            onClick={() => openLightbox(selectedEquipmentForModal)}
          >
            {t('equipmentPage.viewFullGallery')}
          </Button>,
          <Button 
            key="close" 
            onClick={() => setDetailsModalVisible(false)}
          >
            {t('equipmentPage.close')}
          </Button>
        ]}
      >
        <DetailsModalContent>
          <ModalHeader>
            <ModalTitle level={3}>{name}</ModalTitle>
            <CategoryTag color="processing">{category}</CategoryTag>
          </ModalHeader>

          <DetailsSection>
            <Typography.Paragraph>
              {description || t('equipmentPage.noDescriptionAvailable')}
            </Typography.Paragraph>

            {Object.entries(specifications).map(([key, value]) => (
              <div key={key}>
                <DetailsLabel>{key.replace(/_/g, ' ').toUpperCase()}: </DetailsLabel>
                <DetailsValue>{value}</DetailsValue>
              </div>
            ))}

            {manufacturer && (
              <div>
                <DetailsLabel>{t('equipmentPage.manufacturer')}: </DetailsLabel>
                <DetailsValue>{manufacturer}</DetailsValue>
              </div>
            )}

            {serialNumber && (
              <div>
                <DetailsLabel>{t('equipmentPage.serialNumber')}: </DetailsLabel>
                <DetailsValue>{serialNumber}</DetailsValue>
              </div>
            )}
          </DetailsSection>

          {images && images.length > 0 && (
            <>
              <Typography.Title level={4}>{t('equipmentPage.equipmentGallery')}</Typography.Title>
              <ImageGallerySection>
                {images.slice(0, 6).map((img, index) => (
                  <ThumbnailImage
                    key={index}
                    src={img.url || img}
                    alt={`${name} - Image ${index + 1}`}
                    onClick={() => openLightbox(selectedEquipmentForModal, index)}
                  />
                ))}
              </ImageGallerySection>
            </>
          )}
        </DetailsModalContent>
      </Modal>
    );
  };

  const openDetailsModal = (equipment) => {
    setSelectedEquipmentForModal(equipment);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedEquipmentForModal(null);
  };

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setIsLoading(true);
        
        const rawEquipment = await firebaseService.getAllEquipment() || [];
        
        // Filter out sold equipment
        const availableEquipment = rawEquipment.filter(item => item && item.status !== 'sold');
        
        const sanitizedEquipment = availableEquipment
          .map(item => {
            if (!item || typeof item !== 'object') return null;
            
            return {
              id: item.id || crypto.randomUUID(),
              name: item.name || t('equipmentPage.unnamedEquipment'),
              category: item.category || 'uncategorized',
              status: item.status || 'available',
              images: Array.isArray(item.images) 
                ? item.images.map(img => ({
                    url: typeof img === 'string' 
                      ? img 
                      : (img?.url || '/images/equipment-placeholder.jpg'),
                    alt: item.name || t('equipmentPage.equipmentImage')
                  }))
                : [],
              description: item.description || t('equipmentPage.noDescriptionAvailable')
            };
          })
          .filter(Boolean);  
  
        setEquipmentList(sanitizedEquipment);
        setEquipmentData(sanitizedEquipment);
        setFilteredEquipment(sanitizedEquipment);
      } catch (error) {
        console.error('Error fetching equipment:', error);
        message.error(error.message || t('equipmentPage.failedToLoadEquipment'));
        setEquipmentList([]);
        setEquipmentData([]);
        setFilteredEquipment([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchEquipment();
  }, [t]);
  
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const filteredEquipment = equipmentList.filter(equipment => 
      value === 'All Categories' || 
      (value ? equipment.category === value : true)
    );
    setFilteredEquipment(filteredEquipment);
  };

  const handleImageClick = (equipment) => {
    const transformedImages = equipment.images.map(img => ({
      src: img.url || img,
      alt: equipment.name
    }));

    setSelectedEquipment(equipment);
    setLightboxOpen(true);
  };

  const handleEquipmentClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleImageError = (e) => {
    console.log('Image error for:', e.target.src);
    e.target.src = '/images/equipment-placeholder.jpg';
    e.target.onerror = null; 
  };

  const handleEquipmentDetailsClick = (equipment) => {
    setSelectedEquipmentForModal(equipment);
    setDetailsModalVisible(true);
  };

  return (
    <EquipmentPageContainer>
      <PageHeader>
        <HeroContainer>
          <HeroTitle>{t('equipmentPage.heroTitle')}</HeroTitle>
          <HeroSubtitle>
            {t('equipmentPage.heroSubtitle')}
          </HeroSubtitle>
          <div 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}
          >
            <HeroActionButton
              icon={<SearchOutlined />}
              onClick={() => {
                const gallerySection = document.getElementById('equipment-gallery');
                if (gallerySection) {
                  gallerySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('equipmentPage.browseEquipment')}
            </HeroActionButton>
            <HeroActionButton
              icon={<FaDollarSign />}
              onClick={() => _navigate('/sold-equipment')}
            >
              {t('equipmentPage.viewSoldEquipment')}
            </HeroActionButton>
          </div>
        </HeroContainer>
      </PageHeader>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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

      <GalleryContainer id="equipment-gallery">
        {currentItems.map((equipment, index) => {
          const images = equipment.images || [];
          const imageCount = images.length;

          const coverImage = 
            (equipment.coverImage) || 
            (images.length > 0 
              ? (images[0].url || images[0]) 
              : '/images/equipment-placeholder.jpg');

          return (
            <GalleryItemCard
              key={equipment.id || `equipment-${index}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5 
              }}
            >
              <GalleryItemImageWrapper>
                {(() => {
                  const isVideo = coverImage.toLowerCase().match(/\.(mp4|mov|avi|webm|mkv)$/);
                  return isVideo ? (
                    <video
                      src={coverImage}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                      onError={(e) => {
                        e.target.src = '/images/equipment-placeholder.jpg';
                        e.target.onerror = null;
                      }}
                      onClick={() => openLightbox(equipment)}
                    />
                  ) : (
                    <GalleryItemImage
                      src={coverImage}
                      alt={equipment.name || t('equipmentPage.equipment')}
                      onError={(e) => {
                        e.target.src = '/images/equipment-placeholder.jpg';
                        e.target.onerror = null;
                      }}
                      onClick={() => openLightbox(equipment)}
                    />
                  );
                })()}
                {imageCount > 0 && (
                  <UpdatedImageNumberOverlay>
                    1/{imageCount}
                  </UpdatedImageNumberOverlay>
                )}
              </GalleryItemImageWrapper>
              
              <EquipmentCardDetails>
                <EquipmentCardTitle>{equipment.name}</EquipmentCardTitle>
              </EquipmentCardDetails>

              <DetailsButton 
                type="primary"
                icon={<InfoCircleOutlined />}
                onClick={() => {
                  setSelectedEquipmentForModal(equipment);
                  setDetailsModalVisible(true);
                }}
                block
              >
                {t('equipmentPage.viewDetails')}
              </DetailsButton>
            </GalleryItemCard>
          );
        })}
      </GalleryContainer>

      {/* Pagination Controls */}
      <Pagination
        current={currentPage}
        total={filteredEquipment.length}
        pageSize={itemsPerPage}
        onChange={(page) => setCurrentPage(page)}
        style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          marginBottom: '20px' 
        }}
      />

      {lightboxOpen && lightboxImages.length > 0 && (
        <Modal
          visible={lightboxOpen}
          onCancel={() => setLightboxOpen(false)}
          footer={null}
          width="80%"
          centered
        >
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            slides={lightboxImages}
            index={lightboxIndex}
            plugins={[Zoom, Thumbnails]}
            render={{
              slide: ({ slide, currentIndex }) => {
                if (slide.type === 'video') {
                  return (
                    <video
                      src={slide.src}
                      controls
                      autoPlay
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  );
                }
                return (
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                );
              },
              slideFooter: ({ slide, currentIndex }) => (
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    padding: '10px', 
                    background: 'rgba(0,0,0,0.5)', 
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  {slide.alt} - {slide.number}
                </div>
              )
            }}
            zoom={{
              maxZoomPixelRatio: 10,
              zoomStep: 0.5,
              doubleTapScale: 3,
            }}
            carousel={{
              finite: lightboxImages.length <= 1,
              preload: 2,
            }}
            animation={{
              fade: 300,
              swipe: 300,
            }}
            styles={{
              container: { 
                backgroundColor: 'rgba(0, 0, 0, 0.9)' 
              },
            }}
          />
        </Modal>
      )}

      <EquipmentDetailsModal />
    </EquipmentPageContainer>
  );
};

export default Equipment;