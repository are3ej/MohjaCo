import React from 'react';
import '../styles/RequestQuote.css';

const RequestQuote = () => {
  return (
    <div className="request-quote-page">
      <section className="page-header">
        <div className="container">
          <h1>Request a Quote</h1>
          <p>Fill out the form below to get a customized quote for your needs</p>
        </div>
      </section>

      <section className="quote-form section">
        <div className="container">
          <div className="request-quote-container">
            <h1>Request a Quote</h1>
            <p>Fill out the form to get a quote for our services.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RequestQuote;
