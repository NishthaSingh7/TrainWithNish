import { useMemo, useState } from 'react';
import { supplementDisclaimer, supplements } from '../data/supplements';
import '../css/FeaturePage.css';

function SupplementGuide() {
  const [category, setCategory] = useState('All');
  const categories = useMemo(() => ['All', ...new Set(supplements.map((s) => s.category))], []);

  const filtered = useMemo(() => {
    if (category === 'All') return supplements;
    return supplements.filter((s) => s.category === category);
  }, [category]);

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Supplement Guide</h1>
        <p>
          Learn what common gym supplements do, typical dosing, and when they might help —
          so you can make informed choices.
        </p>
      </div>

      <div className="feature-page-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`feature-page-filter-btn${category === cat ? ' feature-page-filter-btn--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="feature-page-grid feature-page-grid--2">
        {filtered.map((item) => (
          <article key={item.id} className="feature-page-card">
            <span className="feature-page-tag">{item.category}</span>
            <h2>{item.name}</h2>
            <p><strong>Purpose:</strong> {item.purpose}</p>
            <p><strong>Typical dose:</strong> {item.dosage}</p>
            <p><strong>Timing:</strong> {item.timing}</p>
            <p><strong>Notes:</strong> {item.notes}</p>
          </article>
        ))}
      </div>

      <p className="feature-page-disclaimer">{supplementDisclaimer}</p>
    </section>
  );
}

export default SupplementGuide;
