import { useState } from 'react';
import { dayLabels, splitTemplates, workoutSuggestions } from '../data/workoutPlans';
import { loadWeeklyPlan, saveWeeklyPlan } from '../services/featureStorage';
import '../css/FeaturePage.css';

const emptyWeek = () => dayLabels.map((day) => ({ day, workout: 'Rest / Active recovery' }));

function WorkoutPlanner() {
  const [week, setWeek] = useState(() => loadWeeklyPlan()?.days || emptyWeek());
  const [saved, setSaved] = useState(false);

  const applyTemplate = (template) => {
    setWeek(
      dayLabels.map((day, i) => ({
        day,
        workout: template.days[i] || 'Rest / Active recovery',
      }))
    );
    setSaved(false);
  };

  const updateDay = (index, workout) => {
    setWeek((prev) => prev.map((entry, i) => (i === index ? { ...entry, workout } : entry)));
    setSaved(false);
  };

  const handleSave = () => {
    saveWeeklyPlan({ days: week, updatedAt: new Date().toISOString() });
    setSaved(true);
  };

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Workout Planner</h1>
        <p>
          Plan your weekly split, pick a template, or customize each day.
          Your plan saves in your browser automatically when you click Save.
        </p>
      </div>

      <div className="feature-page-grid feature-page-grid--2" style={{ marginBottom: 28 }}>
        {splitTemplates.map((template) => (
          <article key={template.id} className="feature-page-card">
            <h2>{template.name}</h2>
            <p>{template.bestFor}</p>
            <button type="button" className="feature-page-filter-btn" onClick={() => applyTemplate(template)}>
              Use this split
            </button>
          </article>
        ))}
      </div>

      <article className="feature-page-card" style={{ maxWidth: 1150, margin: '0 auto' }}>
        <h2>Your week</h2>
        <ul className="feature-page-list">
          {week.map((entry, index) => (
            <li key={entry.day} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <strong style={{ minWidth: 100 }}>{entry.day}</strong>
              <select
                value={entry.workout}
                onChange={(e) => updateDay(index, e.target.value)}
                style={{ flex: 1, minWidth: 200, padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
              >
                {workoutSuggestions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
                {!workoutSuggestions.includes(entry.workout) && (
                  <option value={entry.workout}>{entry.workout}</option>
                )}
              </select>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="button" className="feature-page-filter-btn feature-page-filter-btn--active" onClick={handleSave}>
            Save plan
          </button>
          {saved && <span style={{ color: '#444' }}>Plan saved!</span>}
        </div>
      </article>
    </section>
  );
}

export default WorkoutPlanner;
