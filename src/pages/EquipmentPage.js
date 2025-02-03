import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EquipmentCard from '../components/Equipment/EquipmentCard';
import '../styles/EquipmentPage.css';

const GIST_URL = 'https://gist.githubusercontent.com/are3ej/a8fdd6ae2aea0a300a337aab53281ea4/raw';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const EquipmentPage = () => {
  const [equipmentData, setEquipmentData] = useState({ equipment: [], lastUpdated: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(GIST_URL);
        if (!response.ok) throw new Error('Failed to fetch equipment data');
        const data = await response.json();
        
        // Only show available (not sold) equipment
        const availableEquipment = {
          ...data,
          equipment: data.equipment.filter(item => !item.sold)
        };
        
        setEquipmentData(availableEquipment);
        setError(null);
      } catch (err) {
        setError('Failed to load equipment data');
        console.error('Error loading equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <motion.main
          className="container flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="loading-container">
            <p>Loading equipment...</p>
          </div>
        </motion.main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <motion.main
          className="container flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="error-container">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="error-message">{error}</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </motion.div>
          </div>
        </motion.main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <motion.main
        className="container flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="page-title">Available Equipment</h2>
          {equipmentData.lastUpdated && (
            <motion.p
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Last updated: {new Date(equipmentData.lastUpdated).toLocaleString()}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="equipment-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {equipmentData.equipment.map((item) => (
              <EquipmentCard 
                key={item.id} 
                equipment={item}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default EquipmentPage;
