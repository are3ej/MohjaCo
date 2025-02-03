import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import '../styles/Equipment.css';

const fallbackEquipment = [
  {
    id: 1,
    name: "Komatsu",
    year: "2023",
    images: [
      { url: "/images/equipment/komatsu1.jpg" },
      { url: "/images/equipment/komatsu2.jpg" }
    ],
    description: "High-performance construction equipment"
  },
  {
    id: 2,
    name: "Komatsu",
    year: "2025",
    images: [
      { url: "/images/equipment/komatsu3.jpg" },
      { url: "/images/equipment/komatsu4.jpg" }
    ],
    description: "Advanced construction machinery"
  }
];

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch('https://gist.githubusercontent.com/are3ej/a8fdd6ae2aea0a300a337aab53281ea4/raw/equipment.json');
        if (!response.ok) {
          throw new Error('Failed to fetch equipment data');
        }
        const text = await response.text(); // Get the raw text first
        // Remove trailing commas before parsing JSON
        const cleanJson = text.replace(/,(\s*[}\]])/g, '$1');
        const data = JSON.parse(cleanJson);
        
        if (!data.equipment || !Array.isArray(data.equipment)) {
          throw new Error('Invalid data format');
        }

        setEquipment(data.equipment);
        setError(null);
      } catch (err) {
        console.error('Error fetching equipment:', err);
        setError('Failed to load equipment data. Please try again later.');
        setEquipment(fallbackEquipment);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleCardClick = (item) => {
    setSelectedEquipment(item);
    setPhotoIndex(0);
  };

  const handleImageError = (e) => {
    e.target.src = '/images/placeholder.jpg';
    e.target.onerror = null;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Equipment</h2>
        <p>{error}</p>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (equipment.length === 0) {
    return (
      <div className="no-data-container">
        <h2>No Equipment Available</h2>
        <p>Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="equipment-page">
      {selectedEquipment && (
        <Lightbox
          open={true}
          close={() => setSelectedEquipment(null)}
          slides={selectedEquipment.images.map(img => ({ src: img.url }))}
          plugins={[Thumbnails, Zoom]}
          index={photoIndex}
          on={{
            view: ({ index }) => setPhotoIndex(index)
          }}
          carousel={{
            spacing: 0,
            padding: 0,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: "bottom",
            width: 120,
            height: 80,
          }}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, .9)" },
          }}
        />
      )}

      <section className="equipment-hero">
        <div className="container">
          <h1>Our Equipment</h1>
          <p>Discover our range of high-quality industrial equipment</p>
          {error && <p className="notice">{error}</p>}
        </div>
      </section>

      <section className="equipment-categories">
        <div className="container">
          <div className="categories-grid">
            {equipment.map((item) => (
              <div
                key={item.id}
                className="category-card"
                onClick={() => handleCardClick(item)}
              >
                <div className="image-container">
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    onError={handleImageError}
                  />
                  <div className="image-overlay">
                    <span>Click to view gallery</span>
                  </div>
                </div>
                <div className="category-content">
                  <h2>{item.name}</h2>
                  <p className="year">Year: {item.year}</p>
                  <p className="description">{item.description}</p>
                  <Link 
                    to="/contact" 
                    className="btn btn-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="equipment-cta">
        <div className="container">
          <h2>Need Custom Equipment?</h2>
          <p>Contact us to discuss your specific requirements</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default Equipment;
