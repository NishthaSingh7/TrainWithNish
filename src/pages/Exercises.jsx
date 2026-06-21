import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { exercises, muscleGroups } from '../data/exercises';
import '../css/FeaturePage.css';

function Exercises() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    if (filter === 'All') return exercises;
    return exercises.filter((ex) => ex.muscle === filter);
  }, [filter]);

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Exercises</h1>
        <p>
          Browse exercises by muscle group — with sets, reps, form cues, and training tips.
          Pair with <Link to="/musclemap">Muscle Map</Link> to see what each muscle does.
        </p>
      </div>

      <div className="feature-page-filters">
        {muscleGroups.map((group) => (
          <button
            key={group}
            type="button"
            className={`feature-page-filter-btn${filter === group ? ' feature-page-filter-btn--active' : ''}`}
            onClick={() => setFilter(group)}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="feature-page-grid">
        {filtered.map((ex) => (
          <article key={ex.id} className="feature-page-card">
            <span className="feature-page-tag">{ex.muscle}</span>
            <h2>{ex.name}</h2>
            <p><strong>Equipment:</strong> {ex.equipment} · <strong>Level:</strong> {ex.difficulty}</p>
            <p><strong>Suggested:</strong> {ex.sets} sets × {ex.reps}</p>
            <p>{ex.description}</p>
            <button
              type="button"
              className="feature-page-filter-btn"
              onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
            >
              {expanded === ex.id ? 'Hide tips' : 'Show tips'}
            </button>
            {expanded === ex.id && (
              <ul className="feature-page-list">
                {ex.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Exercises;
