import { useMemo, useState } from 'react';
import { getQuoteOfTheDay, motivationQuotes } from '../data/motivationQuotes';
import '../css/FeaturePage.css';

function DailyMotivation() {
  const quoteOfDay = useMemo(() => getQuoteOfTheDay(), []);
  const [themeFilter, setThemeFilter] = useState('All');

  const themes = useMemo(() => ['All', ...new Set(motivationQuotes.map((q) => q.theme))], []);

  const filtered = useMemo(() => {
    if (themeFilter === 'All') return motivationQuotes;
    return motivationQuotes.filter((q) => q.theme === themeFilter);
  }, [themeFilter]);

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Daily Motivation</h1>
        <p>Start your day with a quote that keeps you showing up — in the gym and in life.</p>
      </div>

      <article className="feature-page-card" style={{ maxWidth: 800, margin: '0 auto 28px', textAlign: 'center' }}>
        <span className="feature-page-tag">Quote of the day</span>
        <p style={{ fontSize: '1.35rem', fontStyle: 'italic', color: '#1e1e1e', margin: '16px 0' }}>
          &ldquo;{quoteOfDay.text}&rdquo;
        </p>
        <p style={{ color: '#888' }}>— {quoteOfDay.author}</p>
      </article>

      <div className="feature-page-filters">
        {themes.map((theme) => (
          <button
            key={theme}
            type="button"
            className={`feature-page-filter-btn${themeFilter === theme ? ' feature-page-filter-btn--active' : ''}`}
            onClick={() => setThemeFilter(theme)}
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="feature-page-grid feature-page-grid--2">
        {filtered.map((quote) => (
          <article key={quote.text} className="feature-page-card">
            <span className="feature-page-tag">{quote.theme}</span>
            <p style={{ fontStyle: 'italic', fontSize: '1.05rem' }}>&ldquo;{quote.text}&rdquo;</p>
            <p style={{ color: '#888', marginTop: 12 }}>— {quote.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DailyMotivation;
