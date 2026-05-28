// MuscleMap.jsx (DEV: includes drag-to-position hotspot editor + polygon highlight)
import React, { useMemo, useRef, useState, useEffect } from "react";
import "../css/MuscleMap.css";

function MuscleMap() {
  const [view, setView] = useState("front"); // 'front' or 'back'
  const [maleSelected, setMaleSelected] = useState(null);
  const [femaleSelected, setFemaleSelected] = useState(null);
  const [highlightedMuscle, setHighlightedMuscle] = useState(null);

  // EDIT MODE toggles the draggable hotspots UI
  const [editMode, setEditMode] = useState(false);

  // refs
  const maleWrapperRef = useRef(null);
  const femaleWrapperRef = useRef(null);

  const maleImage = `/images/male-${view}.png`;
  const femaleImage = `/images/female-${view}.png`;

  useEffect(() => {
    setMaleSelected(null);
    setFemaleSelected(null);
    setHighlightedMuscle(null);
  }, [view]);

  // initial polygon shapes (percent coords 0..100)
  const initialPolygons = useMemo(
    () => ({
      front: {
        "Chest (Pectoralis)": [
          [26.51, 14.25],
          [50.51, 14.25],
          [56.51, 28.25],
          [50.51, 34.25],
          [38.51, 30.25],
          [26.51, 26.25],
        ],
        "Shoulder (Deltoid)": [
          [24.32, 19.27],
          [32.32, 15.27],
          [40.32, 19.27],
          [34.32, 29.27],
        ],
        Biceps: [
          [24, 28],
          [30, 26],
          [34, 36],
          [28, 44],
          [22, 40],
        ],
        Forearm: [
          [20, 44],
          [28, 46],
          [26, 56],
          [18, 54],
        ],
        "Abs (Rectus Abdominis)": [
          [41.8, 29.69],
          [57.8, 29.69],
          [59.8, 45.69],
          [39.8, 45.69],
        ],
        Obliques: [
          [62, 38],
          [72, 44],
          [68, 56],
          [58, 48],
        ],
        Quadriceps: [
          [44, 60],
          [56, 60],
          [62, 78],
          [36, 78],
        ],
        "Hamstrings (front area)": [
          [34, 78],
          [46, 76],
          [52, 88],
          [36, 90],
        ],
        Calves: [
          [50, 84],
          [56, 84],
          [58, 96],
          [46, 96],
        ],
        Neck: [
          [45.8, 13.4],
          [53.8, 13.4],
          [55.8, 21.4],
          [43.8, 21.4],
        ],
      },
      back: {
        Trapezius: [
          [40, 12],
          [60, 12],
          [66, 22],
          [34, 22],
        ],
        "Upper Back (Rhomboids)": [
          [40, 24],
          [60, 24],
          [64, 34],
          [36, 34],
        ],
        "Lats (Latissimus Dorsi)": [
          [23.2, 21.97],
          [63.2, 21.97],
          [67.2, 39.97],
          [19.2, 39.97],
        ],
        "Rear Deltoid": [
          [18, 18],
          [26, 16],
          [34, 22],
          [26, 28],
        ],
        "Triceps (back)": [
          [24, 34],
          [30, 34],
          [34, 44],
          [28, 50],
          [22, 46],
        ],
        "Lower Back (Erector Spinae)": [
          [44, 44],
          [56, 44],
          [58, 58],
          [42, 58],
        ],
        Glutes: [
          [41.86, 40.94],
          [61.86, 40.94],
          [63.86, 50.94],
          [39.86, 52.94],
        ],
        Hamstrings: [
          [38, 76],
          [54, 76],
          [56, 88],
          [36, 90],
        ],
        "Calves (back)": [
          [46, 88],
          [54, 88],
          [56, 98],
          [44, 98],
        ],
      },
    }),
    []
  );

  // Compute centroid percent for each polygon so markers are single points to drag.
  const computeCentroid = (poly) => {
    const n = poly.length;
    if (n === 0) return { x: 50, y: 50 };
    let sx = 0,
      sy = 0;
    poly.forEach((p) => {
      sx += p[0];
      sy += p[1];
    });
    return { x: sx / n, y: sy / n };
  };

  // Build initial centroids map from initialPolygons
  const initialCentroids = useMemo(() => {
    const out = { front: {}, back: {} };
    Object.keys(initialPolygons.front).forEach((name) => {
      out.front[name] = computeCentroid(initialPolygons.front[name]);
    });
    Object.keys(initialPolygons.back).forEach((name) => {
      out.back[name] = computeCentroid(initialPolygons.back[name]);
    });
    return out;
  }, [initialPolygons]);

  // Stateful centroids so we can update by dragging
  const [centroids, setCentroids] = useState(initialCentroids);

  // Keep polygon shapes for detection (we'll still use the polygon array; we update centroid only)
  const musclePolygons = useMemo(() => initialPolygons, [initialPolygons]);

  // point-in-polygon (ray casting)
  function pointInPoly([x, y], poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0],
        yi = poly[i][1];
      const xj = poly[j][0],
        yj = poly[j][1];
      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi + 0.0000001) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function findMuscleAtPercent(percentPoint, viewName) {
    const polygons = musclePolygons[viewName];
    if (!polygons) return null;
    const names = Object.keys(polygons);
    for (let i = 0; i < names.length; i++) {
      const nm = names[i];
      if (pointInPoly([percentPoint.x, percentPoint.y], polygons[nm]))
        return nm;
    }
    return null;
  }

  // clicking image to select muscle (existing behavior)
  function handleWrapperClick(e, side) {
    if (e.button !== 0) return;
    const wrapper =
      side === "male" ? maleWrapperRef.current : femaleWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    const point = {
      x: Math.max(0, Math.min(100, px)),
      y: Math.max(0, Math.min(100, py)),
    };

    console.log(
      `[MuscleMap] click side=${side} view=${view} px=${point.x.toFixed(
        2
      )} py=${point.y.toFixed(2)}`,
      { rect }
    );

    const found = findMuscleAtPercent(point, view);

    // highlight polygon in edit mode
    if (editMode) setHighlightedMuscle(found);

    console.log("[MuscleMap] found:", found);
    if (side === "male") setMaleSelected(found);
    else setFemaleSelected(found);
  }

  // ----- Drag support: mousedown -> move -> up. Works for mouse and touch.
  const dragStateRef = useRef(null);
  function startDrag(e, side, muscleName) {
    e.preventDefault();
    const wrapper =
      side === "male" ? maleWrapperRef.current : femaleWrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    // store drag context
    dragStateRef.current = { side, muscleName, wrapper, rect };
    // attach listeners on document
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onDragMove, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function onDragMove(e) {
    if (!dragStateRef.current) return;
    e.preventDefault();
    const { muscleName, wrapper } = dragStateRef.current;
    const rect = wrapper.getBoundingClientRect();
    const pointer = e.touches ? e.touches[0] : e;
    const px = ((pointer.clientX - rect.left) / rect.width) * 100;
    const py = ((pointer.clientY - rect.top) / rect.height) * 100;
    const point = {
      x: Math.max(0, Math.min(100, px)),
      y: Math.max(0, Math.min(100, py)),
    };
    setCentroids((prev) => {
      const copy = { front: { ...prev.front }, back: { ...prev.back } };
      copy[view][muscleName] = point;
      return copy;
    });
  }

  function endDrag() {
    // cleanup
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", endDrag);
    dragStateRef.current = null;
  }

  // export the centroids (and polygons if needed)
  function exportHotspots() {
    const exportObj = { polygons: musclePolygons, centroids };
    const json = JSON.stringify(exportObj, null, 2);
    console.log("Exported hotspots:", exportObj);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(json)
        .then(() => {
          alert("Hotspots JSON copied to clipboard (also logged to console).");
        })
        .catch(() => {
          alert("Could not copy to clipboard, but exported to console.");
        });
    } else {
      alert("Clipboard not available; exported to console.");
    }
  }

  // render a draggable marker for every muscle in current view
  function renderMarkers(side) {
    const cset = centroids[view] || {};
    return Object.keys(cset).map((name) => {
      const pt = cset[name];
      const style = { left: `${pt.x}%`, top: `${pt.y}%` };
      return (
        <div
          key={`${side}-${name}`}
          className="hotspot-marker"
          title={name}
          style={style}
          onMouseDown={(e) => startDrag(e, side, name)}
          onTouchStart={(e) => startDrag(e, side, name)}
          onDoubleClick={() => {
            // nudge center back to computed centroid from polygon if needed
            const poly = musclePolygons[view][name];
            if (!poly) return;
            const c = computeCentroid(poly);
            setCentroids((prev) => {
              const copy = { front: { ...prev.front }, back: { ...prev.back } };
              copy[view][name] = c;
              return copy;
            });
          }}
        >
          <div className="hotspot-marker-dot" />
        </div>
      );
    });
  }

  return (
    <section className="muscle-map-section">
      <h2 className="muscle-map-title">🧍‍♂️ Muscle Map</h2>
      <p className="muscle-map-subtitle">
        Explore interactive body part breakdowns
      </p>

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

        {/* Dev controls */}
        <button
          onClick={() => setEditMode((prev) => !prev)}
          style={{ marginLeft: 14 }}
        >
          {editMode ? "Exit Edit Hotspots" : "Edit Hotspots"}
        </button>

        {editMode && (
          <button onClick={exportHotspots} style={{ marginLeft: 8 }}>
            Export Hotspots
          </button>
        )}
      </div>

      <div className="muscle-map-container">
        <div className="selected-label left">
          {maleSelected || "Click male image"}
        </div>

        {/* male */}
        <div className="body-card m">
          <div
            ref={maleWrapperRef}
            className="image-click-wrapper"
            onClick={(e) => handleWrapperClick(e, "male")}
            style={{ display: "inline-block", position: "relative" }}
          >
            <img
              src={maleImage}
              alt="Male Muscle Map"
              className="body-image male"
              style={{ pointerEvents: "none", display: "block" }}
            />

            <svg
              className="highlight-overlay"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {editMode &&
                highlightedMuscle &&
                musclePolygons[view][highlightedMuscle] && (
                  <polygon
                    points={musclePolygons[view][highlightedMuscle]
                      .map(([x, y]) => `${x},${y}`)
                      .join(" ")}
                    className="highlight-polygon"
                  />
                )}

              {/* centroid circles (viewBox units) */}
              {editMode &&
                centroids[view] &&
                Object.keys(centroids[view]).map((name) => (
                  <circle
                    key={`c-${name}`}
                    cx={centroids[view][name].x}
                    cy={centroids[view][name].y}
                    r={1.4}
                    fill={
                      name === highlightedMuscle
                        ? "orange"
                        : "rgba(255,160,0,0.85)"
                    }
                    stroke="#fff"
                    strokeWidth={0.3}
                  />
                ))}
            </svg>

            {/* DOM draggable markers (positioned with percent CSS) */}
            {editMode && renderMarkers("male")}
          </div>
          <p>Male</p>
        </div>

        {/* female */}
        <div className="body-card f">
          <div
            ref={femaleWrapperRef}
            className="image-click-wrapper"
            onClick={(e) => handleWrapperClick(e, "female")}
            style={{ display: "inline-block", position: "relative" }}
          >
            <img
              src={femaleImage}
              alt="Female Muscle Map"
              className="body-image female"
              style={{ pointerEvents: "none", display: "block" }}
            />

            <svg
              className="highlight-overlay"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {editMode &&
                highlightedMuscle &&
                musclePolygons[view][highlightedMuscle] && (
                  <polygon
                    points={musclePolygons[view][highlightedMuscle]
                      .map(([x, y]) => `${x},${y}`)
                      .join(" ")}
                    className="highlight-polygon"
                  />
                )}

              {editMode &&
                centroids[view] &&
                Object.keys(centroids[view]).map((name) => (
                  <circle
                    key={`c2-${name}`}
                    cx={centroids[view][name].x}
                    cy={centroids[view][name].y}
                    r={1.4}
                    fill={
                      name === highlightedMuscle
                        ? "orange"
                        : "rgba(255,160,0,0.85)"
                    }
                    stroke="#fff"
                    strokeWidth={0.3}
                  />
                ))}
            </svg>

            {editMode && renderMarkers("female")}
          </div>
          <p>Female</p>
        </div>

        <div className="selected-label right">
          {femaleSelected || "Click female image"}
        </div>
      </div>
    </section>
  );
}

export default MuscleMap;
