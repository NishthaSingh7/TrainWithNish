import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/LiveToolsSpotlight.css';

const tools = [
  {
    emoji: '🥩',
    title: 'Track Protein',
    desc: 'Search foods, log meals, and watch your daily protein add up in real time.',
    path: '/trackprotein',
  },
  {
    emoji: '🏆',
    title: 'Track Your PRs',
    desc: 'Record your best lifts and build a history of every personal record you set.',
    path: '/trackprs',
  },
  {
    emoji: '🧠',
    title: 'Cravings Controller',
    desc: 'Ride out cravings with a guided timer and tips that keep you on track.',
    path: '/cravings',
  },
  {
    emoji: '💪',
    title: 'Muscle Map',
    desc: 'Explore an interactive body map and learn what each muscle group does.',
    path: '/musclemap',
  },
];

function LiveToolsSpotlight() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="spotlight-section" ref={sectionRef}>
      <div className="spotlight-header" data-reveal="up" style={{ '--reveal-delay': 0 }}>
        <span className="spotlight-eyebrow">Available now</span>
        <h2 className="spotlight-heading">Live Tools</h2>
        <p className="spotlight-subheading">
          Jump straight into the features that are ready to use today.
        </p>
      </div>

      <div className="spotlight-list">
        {tools.map((tool, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <Link
              key={tool.title}
              to={tool.path}
              className={`spotlight-card${fromLeft ? ' spotlight-card--left' : ' spotlight-card--right'}`}
              data-reveal={fromLeft ? 'left' : 'right'}
              style={{ '--reveal-delay': index * 100 }}
            >
              <span className="spotlight-icon">{tool.emoji}</span>
              <div className="spotlight-content">
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
                <span className="spotlight-link">Open tool →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LiveToolsSpotlight;
