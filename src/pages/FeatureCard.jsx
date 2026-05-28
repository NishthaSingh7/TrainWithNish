import React from 'react';
import { Link } from 'react-router-dom';
import '../css/FeatureCard.css';

function FeatureCard() {
  const features = [
    { emoji: "🥩", title: "Track Protein", desc: "Log and monitor your daily protein intake." },
    { emoji: "🏋️‍♀️", title: "Exercises", desc: "Discover exercises for every muscle group." },
    { emoji: "💪", title: "Muscle Map", desc: "Explore interactive body part breakdowns." },
    { emoji: "📅", title: "Workout Planner", desc: "Plan your weekly workout splits." },
    { emoji: "📈", title: "Progress Tracker", desc: "Track your personal records over time." },
    { emoji: "💬", title: "Daily Motivation", desc: "Boost your mindset with motivational quotes." },
    { emoji: "🔥", title: "Challenge Corner", desc: "Take on 30-day fitness challenges and improve." },
    { emoji: "💊", title: "Supplement Guide", desc: "Learn about common gym supplements and usage." },
    { emoji: "🍎", title: "Nutrition Tips", desc: "Understand macros and get meal suggestions." },
    { emoji: "🎯", title: "Transformation Stories", desc: "Read real success stories from the community." },
  ];

  return (
    <section className="feature-section">
      <h2 className="feature-heading">Explore Features</h2>
      <div className="feature-grid">
        {features.map((f, index) => {
          const routeMap = {
            "Track Protein": "/trackprotein",
            "Muscle Map": "/musclemap"
          };

          const linkTo = routeMap[f.title];

          return (
            <div className="feature-card" key={index}>
              {linkTo ? (
                <Link to={linkTo} className="feature-link">
                  <span className="feature-icon">{f.emoji}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </Link>
              ) : (
                <>
                  <span className="feature-icon">{f.emoji}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FeatureCard;
