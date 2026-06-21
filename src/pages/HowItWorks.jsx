import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/HowItWorks.css';

const steps = [
  {
    num: '01',
    emoji: '🥩',
    title: 'Fuel Your Body',
    desc: 'Log meals and hit your daily protein target with smart tracking that keeps nutrition simple.',
  },
  {
    num: '02',
    emoji: '💪',
    title: 'Know Your Muscles',
    desc: 'Tap the interactive muscle map to understand which groups you are training and how they connect.',
  },
  {
    num: '03',
    emoji: '🏆',
    title: 'Break Your Records',
    desc: 'Save personal bests, track PRs over time, and stay motivated every session you walk into the gym.',
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="how-section" id="how-it-works" ref={sectionRef}>
      <div className="how-header" data-reveal="up" style={{ '--reveal-delay': 0 }}>
        <span className="how-eyebrow">Simple workflow</span>
        <h2 className="how-heading">How It Works</h2>
        <p className="how-subheading">
          Three steps to train smarter — no clutter, no guesswork.
        </p>
      </div>

      <div className="how-steps">
        {steps.map((step, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <article
              key={step.num}
              className={`how-step${fromLeft ? ' how-step--left' : ' how-step--right'}`}
              data-reveal={fromLeft ? 'left' : 'right'}
              style={{ '--reveal-delay': index * 120 }}
            >
              <div className="how-step-num">{step.num}</div>
              <div className="how-step-body">
                <span className="how-step-icon">{step.emoji}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HowItWorks;
