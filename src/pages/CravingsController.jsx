import { useEffect, useMemo, useState } from 'react';
import '../css/CravingsController.css';
import { cravingTypes, getCravingById } from '../data/cravingTypes';

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function CravingsController() {
  const [selectedId, setSelectedId] = useState(null);
  const [phase, setPhase] = useState('pick');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  const craving = useMemo(() => getCravingById(selectedId), [selectedId]);

  const tips = useMemo(() => {
    if (!craving) return [];
    const merged = [];
    for (let i = 0; i < Math.max(craving.motivations.length, craving.distractions.length); i++) {
      if (craving.motivations[i]) merged.push({ type: 'motivation', text: craving.motivations[i] });
      if (craving.distractions[i]) merged.push({ type: 'distraction', text: craving.distractions[i] });
    }
    return merged;
  }, [craving]);

  const currentTip = tips[tipIndex % tips.length];

  useEffect(() => {
    if (phase !== 'running' || secondsLeft <= 0) return undefined;

    const tick = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setPhase('done');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [phase, secondsLeft]);

  useEffect(() => {
    if (phase !== 'running') return undefined;

    const rotate = setInterval(() => {
      setTipIndex((i) => i + 1);
    }, 8000);

    return () => clearInterval(rotate);
  }, [phase]);

  const startTimer = () => {
    if (!craving) return;
    const duration = craving.durationMinutes * 60;
    setTotalSeconds(duration);
    setSecondsLeft(duration);
    setTipIndex(0);
    setPhase('running');
  };

  const reset = () => {
    setPhase('pick');
    setSelectedId(null);
    setSecondsLeft(0);
    setTotalSeconds(0);
    setTipIndex(0);
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <section className="cravings-wrapper">
      <div className="cravings-hero">
        <h1>Cravings Controller</h1>
        <p>
          Feeling a craving? Pick what you are facing, start the timer, and wait it out.
          Most urges fade if you give them a few minutes instead of acting immediately.
        </p>
      </div>

      {phase === 'pick' && (
        <div className="cravings-pick">
          <h2>What are you craving?</h2>
          <div className="cravings-grid">
            {cravingTypes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`craving-chip ${selectedId === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <span className="craving-chip-emoji">{item.emoji}</span>
                <span className="craving-chip-label">{item.label}</span>
                <span className="craving-chip-time">{item.durationMinutes} min wait</span>
              </button>
            ))}
          </div>

          {craving ? (
            <div className="cravings-preview">
              <p>{craving.summary}</p>
              <button type="button" className="cravings-start-btn" onClick={startTimer}>
                Start {craving.durationMinutes}-minute timer
              </button>
            </div>
          ) : (
            <p className="cravings-hint">Select a craving type above to begin.</p>
          )}
        </div>
      )}

      {phase === 'running' && craving && (
        <div className="cravings-timer-panel">
          <p className="cravings-active-label">
            {craving.emoji} Riding out: {craving.label}
          </p>

          <div className="cravings-timer-ring" style={{ '--progress': `${progress}%` }}>
            <span className="cravings-timer-value">{formatTime(secondsLeft)}</span>
            <span className="cravings-timer-sub">stay with it</span>
          </div>

          {currentTip ? (
            <div className={`cravings-tip ${currentTip.type}`}>
              <p className="cravings-tip-kicker">
                {currentTip.type === 'motivation' ? 'Motivation' : 'Try this instead'}
              </p>
              <p className="cravings-tip-text">{currentTip.text}</p>
            </div>
          ) : null}

          <button type="button" className="cravings-cancel-btn" onClick={reset}>
            I gave in — reset
          </button>
        </div>
      )}

      {phase === 'done' && craving && (
        <div className="cravings-done-panel">
          <h2>You made it through</h2>
          <p>
            The {craving.label.toLowerCase()} craving wave passed. That is a real win — your brain
            learns every time you wait instead of react.
          </p>
          <div className="cravings-done-actions">
            <button type="button" className="cravings-start-btn" onClick={reset}>
              Log another craving
            </button>
            <button type="button" className="cravings-secondary-btn" onClick={startTimer}>
              Run timer again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CravingsController;
