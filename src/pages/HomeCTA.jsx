import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/HomeCTA.css';

function HomeCTA() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="home-cta-section" ref={sectionRef}>
      <div className="home-cta-inner" data-reveal="scale" style={{ '--reveal-delay': 0 }}>
        <h2>Ready to Train Smarter?</h2>
        <p>Explore every tool, pick your starting point, and make today count.</p>
        <button className="home-cta-btn" onClick={scrollToFeatures}>
          Explore All Features
        </button>
      </div>
    </section>
  );
}

export default HomeCTA;
