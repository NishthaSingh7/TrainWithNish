import React, { useState } from 'react';
import '../css/MuscleMap.css';

function MuscleMap() {
  const [view, setView] = useState("front"); // 'front' or 'back'

  const maleImage = `/images/male-${view}.png`;
  const femaleImage = `/images/female-${view}.png`;

  return (
    <section className="muscle-map-section">
      <h2 className="muscle-map-title">🧍‍♂️ Muscle Map</h2>
      <p className="muscle-map-subtitle">Explore interactive body part breakdowns</p>

      {/* Toggle Buttons */}
      <div className="toggle-view-buttons">
        <button
          className={view === "front" ? "active" : ""}
          onClick={() => setView("front")}
        >
          Front View
        </button>
        <button
          className={view === "back" ? "active" : ""}
          onClick={() => setView("back")}
        >
          Back View
        </button>
      </div>

      <div className="muscle-map-container">
        <div className="body-card m">
          <img src={maleImage} alt="Male Muscle Map" className="body-image male" />
          <p>Male</p>
        </div>
        <div className="body-card f">
          <img src={femaleImage} alt="Female Muscle Map" className="body-image female" />
          <p>Female</p>
        </div>
      </div>
    </section>
  );
}

export default MuscleMap;
