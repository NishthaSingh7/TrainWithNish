import React, { useEffect, useMemo, useState } from 'react';
import '../css/TrackProtein.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Confetti from 'react-confetti';
import { getLocalProteinEstimate } from '../services/localProteinLookup';
import { lookupProteinFromApi } from '../services/proteinLookup';

function TrackProtein() {
  const [proteinGoal, setProteinGoal] = useState(100);
  const [totalProtein, setTotalProtein] = useState(0);
  const [value, setValue] = useState('');
  const [foodArray, setFoodArray] = useState([]);
  const [goalReached, setGoalReached] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLookupLoading, setIsLookupLoading] = useState(false);
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const safeGoal = proteinGoal > 0 ? proteinGoal : 1;
  const remainingProtein = Math.max(0, proteinGoal - totalProtein);
  const overGoalProtein = Math.max(0, totalProtein - proteinGoal);
  const progressPercent = Math.min(100, Math.round((totalProtein / safeGoal) * 100));
  const pieColors = ['#BF9264', '#F0F1C5', '#6F826A'];

  const chartData = useMemo(() => {
    if (proteinGoal <= 0) {
      return [{ name: 'Consumed', value: totalProtein || 0 }];
    }
    return [
      { name: 'Consumed', value: Math.min(totalProtein, proteinGoal) },
      { name: 'Remaining', value: remainingProtein },
      { name: 'Over Goal', value: overGoalProtein }
    ].filter((slice) => slice.value > 0);
  }, [overGoalProtein, proteinGoal, remainingProtein, totalProtein]);

  useEffect(() => {
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAdd = async () => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setStatusMessage('Please enter a meal or food item.');
      return;
    }

    setStatusMessage('');
    let resolvedProtein = getLocalProteinEstimate(trimmedValue);

    if (!resolvedProtein) {
      setIsLookupLoading(true);
      const apiResult = await lookupProteinFromApi(trimmedValue);
      setIsLookupLoading(false);
      if (apiResult) {
        resolvedProtein = {
          proteinAmount: apiResult.proteinAmount,
          breakdown: apiResult.breakdown,
          source: 'API'
        };
      }
    }

    if (!resolvedProtein) {
      setStatusMessage('Not found locally. Add VITE_USDA_API_KEY in .env for USDA lookup, or try a clearer entry like "100g paneer" or "2 eggs".');
      return;
    }

    const proteinAmount = Number(resolvedProtein.proteinAmount.toFixed(2));
    setFoodArray((prev) => [
      ...prev,
      {
        name: trimmedValue,
        protein: proteinAmount,
        breakdown: resolvedProtein.breakdown,
        source: resolvedProtein.source
      }
    ]);
    setTotalProtein((prev) => {
      const nextTotal = prev + proteinAmount;
      if (nextTotal >= proteinGoal && prev < proteinGoal) {
        setGoalReached(true);
        setTimeout(() => setGoalReached(false), 7000);
      }
      return nextTotal;
    });
    setValue('');
    setStatusMessage(`${Math.round(proteinAmount)}g added from ${resolvedProtein.source} lookup.`);
  };

  return (
    <>
      {goalReached && <Confetti width={viewport.width} height={viewport.height} />}
      {goalReached && (
        <div className="confetti">
          <h2>Goal Reached</h2>
          <p>You hit your daily protein target. Great consistency.</p>
        </div>
      )}

      <section className="trackpro-wrapper">
        <div className="trackpro-hero">
          <h1>Track Protein</h1>
          <p>Log meals, estimate protein intelligently, and stay aligned with your daily goal.</p>
        </div>

        <div className="trackpro-grid">
          <article className="track-card input-card">
            <h2>Daily Log</h2>
            <div className="goal-input-wrapper">
              <label htmlFor="goal-input">Daily goal (grams)</label>
              <input
                id="goal-input"
                type="number"
                min="1"
                value={proteinGoal}
                onChange={(e) => setProteinGoal(Number(e.target.value))}
                className="goal-input"
              />
            </div>

            <div className="meal-entry-row">
              <input
                type="text"
                id="mealinput"
                placeholder='Try "100g paneer", "2 eggs", or a dish name'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAdd();
                  }
                }}
              />
              <button type="button" onClick={handleAdd} disabled={isLookupLoading}>
                {isLookupLoading ? 'Looking up...' : 'Add meal'}
              </button>
            </div>

            {statusMessage ? <p className="status-message">{statusMessage}</p> : null}

            <div className="meal-list-wrapper">
              {foodArray.length === 0 ? (
                <p className="empty-state">No meals logged yet. Add your first item to start tracking.</p>
              ) : (
                <ul className="meal-list">
                  {foodArray.map((food, index) => (
                    <li className="meal-item" key={`${food.name}-${index}`}>
                      <div className="meal-top">
                        <span className="meal-name">{food.name}</span>
                        <span className="meal-protein">{Math.round(food.protein)}g</span>
                      </div>
                      <div className="meal-meta">
                        <span className={`source-chip ${food.source === 'API' ? 'api' : 'local'}`}>{food.source}</span>
                        {food.breakdown ? <span>{food.breakdown}</span> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>

          <article className="track-card analytics-card">
            <h2>Protein Insights</h2>
            <div className="stat-row">
              <div className="stat-box">
                <span>Total</span>
                <strong>{Math.round(totalProtein)}g</strong>
              </div>
              <div className="stat-box">
                <span>Remaining</span>
                <strong>{Math.round(remainingProtein)}g</strong>
              </div>
              <div className="stat-box">
                <span>Progress</span>
                <strong>{progressPercent}%</strong>
              </div>
            </div>

            <div className="chart-shell">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    stroke="#f5f5f5"
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={78}
                    outerRadius={118}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${Math.round(val)}g`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-legend">
              {chartData.map((entry, index) => (
                <div className="legend-item" key={`legend-${entry.name}`}>
                  <span className="legend-dot" style={{ backgroundColor: pieColors[index % pieColors.length] }} />
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>

            {overGoalProtein > 0 ? (
              <p className="over-goal-note">You are {Math.round(overGoalProtein)}g over goal today. Adjust tomorrow to balance weekly intake.</p>
            ) : null}
          </article>
        </div>
      </section>
    </>
  );
}

export default TrackProtein;
