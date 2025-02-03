import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: 'fa-truck',
      title: 'Equipment Supply',
      description: 'We provide high-quality industrial equipment from trusted manufacturers worldwide.',
      link: '/equipment'
    },
    {
      id: 2,
      icon: 'fa-tools',
      title: 'Maintenance & Repair',
      description: 'Professional maintenance and repair services to keep your equipment running efficiently.',
      link: '/contact'
    },
    {
      id: 3,
      icon: 'fa-cogs',
      title: 'Custom Solutions',
      description: 'Tailored equipment solutions designed to meet your specific industry requirements.',
      link: '/request-quote'
    },
    {
      id: 4,
      icon: 'fa-handshake',
      title: 'Consulting Services',
      description: 'Expert advice on equipment selection, optimization, and industrial processes.',
      link: '/contact'
    },
    {
      id: 5,
      icon: 'fa-shipping-fast',
      title: 'Logistics Support',
      description: 'Efficient shipping and delivery services to ensure timely equipment deployment.',
      link: '/contact'
    },
    {
      id: 6,
      icon: 'fa-graduation-cap',
      title: 'Training Programs',
      description: 'Comprehensive training for proper equipment operation and maintenance.',
      link: '/contact'
    }
  ];

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive solutions for your industrial equipment needs</p>
        </div>
      </section>

      <section className="services-grid section">
        <div className="container">
          <div className="services-list">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to={service.link} className="btn btn-outline">
                  Learn More
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>Need a Custom Solution?</h2>
            <p>Contact our team to discuss your specific requirements and get a tailored quote.</p>
            <div className="cta-buttons">
              <Link to="/request-quote" className="btn btn-primary">
                <i className="fas fa-file-alt"></i>
                Request Quote
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-phone"></i>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
