import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/WhyTrainWithNish.css';

const reasons = [
  { emoji: '🆓', title: 'Completely Free', desc: 'No paywalls on the tools that matter most. Train without subscriptions.' },
  { emoji: '🎯', title: 'Built for Lifters', desc: 'Every feature is designed around real gym habits — protein, PRs, cravings, and anatomy.' },
  { emoji: '⚡', title: 'Fast & Focused', desc: 'Clean interface, no noise. Log a meal or a PR in seconds and get back to training.' },
  { emoji: '🚀', title: 'Always Growing', desc: 'New tools like workout planners and exercise libraries are on the way.' },
];

function WhyTrainWithNish() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="why-section" ref={sectionRef}>
      <div className="why-header" data-reveal="up" style={{ '--reveal-delay': 0 }}>
        <span className="why-eyebrow">Why us</span>
        <h2 className="why-heading">Built for Your Gym Life</h2>
        <p className="why-subheading">
          TrainWithNish is the companion you actually want open between sets.
        </p>
      </div>

      <div className="why-grid">
        {reasons.map((item, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <div
              key={item.title}
              className="why-card"
              data-reveal={fromLeft ? 'left' : 'right'}
              style={{ '--reveal-delay': index * 90 }}
            >
              <span className="why-icon">{item.emoji}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyTrainWithNish;
