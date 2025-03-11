import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/EquipmentCard.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

const EquipmentCard = ({ equipment }) => {
  const { name, description, price, image, specs } = equipment;

  return (
    <motion.div
      className="equipment-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="equipment-image">
        <img src={image} alt={name} />
      </div>
      
      <div className="equipment-details">
        <h3 className="equipment-name">{name}</h3>
        <p className="equipment-description">{description}</p>
        
        {specs && (
          <div className="equipment-specs">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">{key}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="equipment-price">
          <span className="price-label">Price:</span>
          <span className="price-value">${price.toLocaleString()}</span>
        </div>

        <motion.button
          className="inquiry-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/contact'}
        >
          Inquire Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EquipmentCard;