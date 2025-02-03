import React from 'react';
import '../styles/Legal.css';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <section className="page-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Learn how we handle and protect your information</p>
        </div>
      </section>

      <section className="legal-content section">
        <div className="container">
          <h1>Privacy Policy</h1>
          <h2>Information We Collect</h2>
          <p>We collect information to provide and improve our services.</p>
          
          <h2>How We Use Your Information</h2>
          <p>We use the information to provide, maintain, and improve our services.</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
