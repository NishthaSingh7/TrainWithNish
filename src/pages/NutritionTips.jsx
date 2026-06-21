import { Link } from 'react-router-dom';
import { macroGuide, mealTips, quickMeals } from '../data/nutritionTips';
import '../css/FeaturePage.css';

function NutritionTips() {
  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Nutrition Tips</h1>
        <p>
          Understand macros, meal timing, and simple high-protein ideas.
          Log meals in <Link to="/trackprotein">Track Protein</Link> to put this into practice.
        </p>
      </div>

      <div className="feature-page-grid feature-page-grid--2" style={{ marginBottom: 28 }}>
        {Object.values(macroGuide).map((macro) => (
          <article key={macro.label} className="feature-page-card">
            <span className="feature-page-tag">{macro.label}</span>
            <p><strong>Role:</strong> {macro.role}</p>
            <p><strong>Target:</strong> {macro.target}</p>
            <p><strong>Good sources:</strong></p>
            <ul className="feature-page-list">
              {macro.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="feature-page-grid feature-page-grid--2" style={{ marginBottom: 28 }}>
        {mealTips.map((tip) => (
          <article key={tip.title} className="feature-page-card">
            <h2>{tip.title}</h2>
            <p><strong>When:</strong> {tip.timing}</p>
            <p><strong>Ideas:</strong> {tip.ideas.join(' · ')}</p>
            <p><strong>Tip:</strong> {tip.tip}</p>
          </article>
        ))}
      </div>

      <article className="feature-page-card" style={{ maxWidth: 1150, margin: '0 auto' }}>
        <h2>Quick high-protein meals</h2>
        <ul className="feature-page-list">
          {quickMeals.map((meal) => (
            <li key={meal.name} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <strong>{meal.name}</strong>
              <span>{meal.protein}</span>
              <span style={{ color: '#888' }}>{meal.prep} prep</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export default NutritionTips;
