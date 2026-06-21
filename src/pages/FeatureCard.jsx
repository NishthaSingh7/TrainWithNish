import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/FeatureCard.css';

function FeatureCard() {
  const sectionRef = useRef(null);

  const features = [
    { emoji: "🥩", title: "Track Protein", desc: "Log and monitor your daily protein intake.", path: "/trackprotein" },
    { emoji: "🏆", title: "Track Your PRs", desc: "Log your best lifts and keep personal records saved.", path: "/trackprs" },
    { emoji: "🧠", title: "Cravings Controller", desc: "Wait out cravings with a guided timer and tips.", path: "/cravings" },
    { emoji: "💪", title: "Muscle Map", desc: "Explore interactive body part breakdowns.", path: "/musclemap" },
    { emoji: "🏋️‍♀️", title: "Exercises", desc: "Discover exercises for every muscle group.", path: "/exercises" },
    { emoji: "📅", title: "Workout Planner", desc: "Plan your weekly workout splits.", path: "/planner" },
    { emoji: "📈", title: "Progress Tracker", desc: "Track your personal records over time.", path: "/progress" },
    { emoji: "💬", title: "Daily Motivation", desc: "Boost your mindset with motivational quotes.", path: "/motivation" },
    { emoji: "🔥", title: "Challenge Corner", desc: "Take on 30-day fitness challenges and improve.", path: "/challenges" },
    { emoji: "💊", title: "Supplement Guide", desc: "Learn about common gym supplements and usage.", path: "/supplements" },
    { emoji: "🍎", title: "Nutrition Tips", desc: "Understand macros and get meal suggestions.", path: "/nutrition" },
    { emoji: "🎯", title: "Transformation Stories", desc: "Read real success stories from the community.", path: "/stories" },
  ];

  useScrollReveal(sectionRef);

  return (
    <section className="feature-section" id="features" ref={sectionRef}>
      <div className="feature-header" data-reveal="up" style={{ '--reveal-delay': 0 }}>
        <span className="feature-eyebrow">What you can do</span>
        <h2 className="feature-heading">Explore Features</h2>
        <p className="feature-subheading">
          Pick a tool and start training smarter today.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((f, index) => {
          const fromLeft = index % 2 === 0;

          return (
            <div
              className="feature-card feature-card--live"
              key={f.title}
              data-reveal={fromLeft ? 'left' : 'right'}
              style={{ '--reveal-delay': (index % 4) * 80 }}
            >
              <span className="feature-live-badge">Live</span>
              <Link to={f.path} className="feature-link">
                <span className="feature-icon">{f.emoji}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feature-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureCard;
