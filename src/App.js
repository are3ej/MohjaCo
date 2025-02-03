import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/App.css';

// Simple loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Equipment = React.lazy(() => import('./pages/Equipment'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/equipment" element={<Equipment />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
