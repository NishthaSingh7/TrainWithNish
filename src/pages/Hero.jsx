import React, { useEffect, useRef } from 'react';
import '../css/Hero.css';

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hero.classList.add('hero--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToNext = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb--1" aria-hidden="true" />
        <div className="hero-orb hero-orb--2" aria-hidden="true" />
        <div className="hero-orb hero-orb--3" aria-hidden="true" />
      </div>

      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-badge">Your all-in-one gym companion</span>

          <h2 className="hero-title">
            <span className="hero-title-line">Train Smarter,</span>
            <span className="hero-title-line hero-title-line--accent">Get Stronger</span>
            <span className="hero-title-emoji" aria-hidden="true">💪</span>
          </h2>

          <p className="hero-subtitle">
            Track protein, explore exercises, map your muscles, and crush your fitness goals — all in one place.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">12</span>
              <span className="hero-stat-label">Live Tools</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Free to Use</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div className="hero-stat">
              <span className="hero-stat-value">24/7</span>
              <span className="hero-stat-label">Always On</span>
            </div>
          </div>

          <div className="hero-actions">
            <button className="hero-cta" onClick={scrollToNext}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
