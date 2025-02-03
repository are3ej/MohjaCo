import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const SoldEquipmentPage = () => {
  const location = useLocation();
  const soldEquipment = location.state?.soldEquipment;

  return (
    <div className="sold-equipment-page">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Sold Equipment</h1>
        
        {soldEquipment ? (
          <motion.div
            className="sold-equipment-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>{soldEquipment.name} - {soldEquipment.year}</h2>
            <p><strong>Sold Date:</strong> {new Date(soldEquipment.soldDate).toLocaleDateString()}</p>
            <p><strong>Price:</strong> {soldEquipment.price}</p>
            <p>{soldEquipment.description}</p>
            <div className="sold-equipment-images">
              {soldEquipment.images.map((image, index) => (
                <img 
                  key={index}
                  src={image.url}
                  alt={`${soldEquipment.name} view ${index + 1}`}
                  className="sold-equipment-image"
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <p>No sold equipment data available.</p>
        )}
      </motion.div>
    </div>
  );
};

export default SoldEquipmentPage;
