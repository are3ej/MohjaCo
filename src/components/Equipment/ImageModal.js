import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ImageModal.css';

const ImageModal = ({ image, alt, isOpen, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.min(Math.max(0.5, newScale), 3));
  };

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-controls"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setScale(Math.min(scale + 0.1, 3))}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <button onClick={() => setScale(Math.max(scale - 0.1, 0.5))}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 13H5v-2h14v2z"/>
              </svg>
            </button>
            <button onClick={() => {
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M9 3L5 7h3v7h2V7h3L9 3zm6 14v-7h-2v7h-3l4 4 4-4h-3z"/>
              </svg>
            </button>
          </motion.div>
          
          <motion.div
            className="modal-content"
            variants={imageVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={image}
              alt={alt}
              drag
              dragElastic={0.1}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onWheel={handleWheel}
              style={{
                scale,
                x: position.x,
                y: position.y,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              animate={{
                scale: scale,
                transition: { type: 'spring', stiffness: 300, damping: 30 }
              }}
            />
          </motion.div>

          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
