import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBestByExercise, loadPRs } from '../services/prStorage';
import '../css/FeaturePage.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function ProgressTracker() {
  const records = useMemo(() => loadPRs(), []);
  const personalBests = useMemo(() => getBestByExercise(records), [records]);

  const stats = useMemo(() => {
    const exercises = new Set(records.map((r) => r.exercise.toLowerCase()));
    const last30 = records.filter((r) => {
      const diff = Date.now() - new Date(r.date).getTime();
      return diff <= 30 * 86400000;
    });
    return {
      totalLifts: records.length,
      uniqueExercises: exercises.size,
      last30Days: last30.length,
      latestPR: records[0] || null,
    };
  }, [records]);

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Progress Tracker</h1>
        <p>
          See your lifting progress at a glance — powered by PRs you log in{' '}
          <Link to="/trackprs">Track Your PRs</Link>.
        </p>
      </div>

      <div className="feature-page-grid feature-page-grid--2" style={{ marginBottom: 28 }}>
        <article className="feature-page-card">
          <h2>Overview</h2>
          <ul className="feature-page-list">
            <li><strong>Total lifts logged:</strong> {stats.totalLifts}</li>
            <li><strong>Exercises tracked:</strong> {stats.uniqueExercises}</li>
            <li><strong>Lifts last 30 days:</strong> {stats.last30Days}</li>
            {stats.latestPR && (
              <li><strong>Most recent lift:</strong> {stats.latestPR.exercise} — {stats.latestPR.weight}{stats.latestPR.unit} ({formatDate(stats.latestPR.date)})</li>
            )}
          </ul>
        </article>

        <article className="feature-page-card">
          <h2>Keep building</h2>
          <p>Log every session in Track PRs to watch this dashboard grow over time.</p>
          <div className="feature-page-link-row">
            <Link to="/trackprs">Log a new PR →</Link>
          </div>
        </article>
      </div>

      <article className="feature-page-card" style={{ maxWidth: 1150, margin: '0 auto' }}>
        <h2>Personal bests by exercise</h2>
        {personalBests.length === 0 ? (
          <p className="feature-page-empty">No PRs yet. Log your first lift to start tracking progress.</p>
        ) : (
          <ul className="feature-page-list">
            {personalBests.map((record) => (
              <li key={record.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <strong>{record.exercise}</strong>
                <span>
                  {record.weight}{record.unit}
                  {record.reps ? ` × ${record.reps}` : ''}
                </span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>{formatDate(record.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </article>

      {records.length > 0 && (
        <article className="feature-page-card" style={{ maxWidth: 1150, margin: '24px auto 0' }}>
          <h2>Recent activity</h2>
          <ul className="feature-page-list">
            {records.slice(0, 10).map((record) => (
              <li key={record.id} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span>{record.exercise}</span>
                <span>{record.weight}{record.unit}{record.reps ? ` × ${record.reps}` : ''}</span>
                <span style={{ color: '#888', fontSize: '0.85rem' }}>{formatDate(record.date)}</span>
              </li>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
}

export default ProgressTracker;
