import { useState } from 'react';
import { challenges } from '../data/challenges';
import { isChallengeTaskDone, toggleChallengeTask } from '../services/featureStorage';
import '../css/FeaturePage.css';

function ChallengeCorner() {
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  const handleToggle = (challengeId, taskIndex) => {
    toggleChallengeTask(challengeId, taskIndex);
    refresh();
  };

  return (
    <section className="feature-page">
      <div className="feature-page-hero">
        <h1>Challenge Corner</h1>
        <p>
          Take on 30-day fitness challenges. Check off tasks as you complete them —
          progress saves in your browser.
        </p>
      </div>

      <div className="feature-page-grid">
        {challenges.map((challenge) => {
          const doneCount = challenge.tasks.filter((_, i) =>
            isChallengeTaskDone(challenge.id, i)
          ).length;

          return (
            <article key={challenge.id} className="feature-page-card">
              <span className="feature-page-tag">{challenge.duration}</span>
              <h2>{challenge.title}</h2>
              <p>{challenge.goal}</p>
              <p><strong>Progress:</strong> {doneCount} / {challenge.tasks.length} tasks</p>
              <ul className="feature-page-list">
                {challenge.tasks.map((task, index) => {
                  const done = isChallengeTaskDone(challenge.id, index);
                  return (
                    <li key={task}>
                      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'inherit' }}>
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => handleToggle(challenge.id, index)}
                          style={{ marginTop: 4 }}
                        />
                        <span style={{ textDecoration: done ? 'line-through' : 'none', color: done ? '#999' : '#444' }}>
                          {task}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ChallengeCorner;
