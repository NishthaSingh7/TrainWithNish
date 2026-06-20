import { useMemo, useState } from 'react';
import '../css/TrackPRs.css';
import {
  createPRRecord,
  deletePR,
  getBestByExercise,
  loadPRs,
  savePR,
} from '../services/prStorage';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function TrackPRs() {
  const [records, setRecords] = useState(() => loadPRs());
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg');
  const [reps, setReps] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const personalBests = useMemo(() => getBestByExercise(records), [records]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedExercise = exercise.trim();
    const parsedWeight = Number(weight);

    if (!trimmedExercise) {
      setMessage('Enter an exercise name.');
      return;
    }
    if (!parsedWeight || parsedWeight <= 0) {
      setMessage('Enter a valid weight greater than zero.');
      return;
    }

    const entry = createPRRecord({
      exercise: trimmedExercise,
      weight: parsedWeight,
      unit,
      reps: reps || null,
      notes,
    });

    const key = trimmedExercise.toLowerCase();
    const previousBest = personalBests.find((r) => r.exercise.toLowerCase() === key);
    savePR(entry);
    setRecords(loadPRs());

    if (previousBest && parsedWeight > previousBest.weight) {
      setMessage(`New PR for ${trimmedExercise}! ${parsedWeight}${unit} beats ${previousBest.weight}${previousBest.unit}.`);
    } else if (!previousBest) {
      setMessage(`First PR logged for ${trimmedExercise}. Keep building.`);
    } else {
      setMessage(`Logged ${parsedWeight}${unit} for ${trimmedExercise}. Current best is still ${previousBest.weight}${previousBest.unit}.`);
    }

    setExercise('');
    setWeight('');
    setReps('');
    setNotes('');
  };

  const handleDelete = (id) => {
    deletePR(id);
    setRecords(loadPRs());
    setMessage('Entry removed.');
  };

  return (
    <section className="trackprs-wrapper">
      <div className="trackprs-hero">
        <h1>Track Your PRs</h1>
        <p>
          Log your personal records — the heaviest weight you have lifted for each exercise.
          Everything saves in your browser so it stays available when you return.
        </p>
      </div>

      <div className="trackprs-grid">
        <article className="trackprs-card">
          <h2>Log a lift</h2>
          <form className="trackprs-form" onSubmit={handleSubmit}>
            <label htmlFor="pr-exercise">Exercise</label>
            <input
              id="pr-exercise"
              type="text"
              placeholder="e.g. Bench press, Squat, Deadlift"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            />

            <div className="trackprs-row">
              <div className="trackprs-field">
                <label htmlFor="pr-weight">Weight</label>
                <input
                  id="pr-weight"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="100"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="trackprs-field">
                <label htmlFor="pr-unit">Unit</label>
                <select id="pr-unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
              <div className="trackprs-field">
                <label htmlFor="pr-reps">Reps (optional)</label>
                <input
                  id="pr-reps"
                  type="number"
                  min="1"
                  placeholder="5"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="pr-notes">Notes (optional)</label>
            <input
              id="pr-notes"
              type="text"
              placeholder="e.g. Felt strong, belt on, gym PR"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button type="submit" className="trackprs-submit">
              Save PR
            </button>
          </form>
          {message ? <p className="trackprs-message">{message}</p> : null}
        </article>

        <article className="trackprs-card">
          <h2>Personal bests</h2>
          {personalBests.length === 0 ? (
            <p className="trackprs-empty">No PRs yet. Log your first lift to get started.</p>
          ) : (
            <ul className="trackprs-best-list">
              {personalBests.map((record) => (
                <li key={record.id}>
                  <div>
                    <strong>{record.exercise}</strong>
                    <span>
                      {record.weight}
                      {record.unit}
                      {record.reps ? ` × ${record.reps}` : ''}
                    </span>
                  </div>
                  <small>{formatDate(record.date)}</small>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <article className="trackprs-card trackprs-history">
        <h2>Full history</h2>
        {records.length === 0 ? (
          <p className="trackprs-empty">Your lift history will appear here.</p>
        ) : (
          <ul className="trackprs-history-list">
            {records.map((record) => (
              <li key={record.id}>
                <div className="trackprs-history-main">
                  <strong>{record.exercise}</strong>
                  <span>
                    {record.weight}
                    {record.unit}
                    {record.reps ? ` × ${record.reps}` : ''}
                  </span>
                  <small>{formatDate(record.date)}</small>
                  {record.notes ? <p className="trackprs-note">{record.notes}</p> : null}
                </div>
                <button type="button" className="trackprs-delete" onClick={() => handleDelete(record.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}

export default TrackPRs;
