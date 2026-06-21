import React, { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../css/ScrollReveal.css';
import '../css/MotivationStrip.css';

const quotes = [
  { text: 'The only bad workout is the one that didn\'t happen.', author: 'Unknown' },
  { text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
  { text: 'Your body can stand almost anything. It\'s your mind you have to convince.', author: 'Unknown' },
];

function MotivationStrip() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section className="motivation-section" ref={sectionRef}>
      <div className="motivation-header" data-reveal="up" style={{ '--reveal-delay': 0 }}>
        <span className="motivation-eyebrow">Mindset</span>
        <h2 className="motivation-heading">Train Your Mind Too</h2>
      </div>

      <div className="motivation-quotes">
        {quotes.map((q, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <blockquote
              key={q.text}
              className="motivation-quote"
              data-reveal={fromLeft ? 'left' : 'right'}
              style={{ '--reveal-delay': index * 100 }}
            >
              <p>&ldquo;{q.text}&rdquo;</p>
              <cite>— {q.author}</cite>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
}

export default MotivationStrip;
