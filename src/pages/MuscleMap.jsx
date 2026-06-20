import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import '../css/MuscleMap.css';
import {
  BODY_FIGURE_NATURAL,
  BODY_FIGURE_VIEW,
  MUSCLE_MAP_CALIBRATION_ENABLED,
} from '../data/bodyFigureConfig';
import { getObjectFitContainRect, getPercentPointInHitLayer } from '../utils/bodyImageRect';
import {
  calibrationTargetKey,
  computeCentroid,
  findMuscleAtPoint,
  getCalibrationTargets,
  getMuscleSides,
  getSidePolygon,
  loadCalibratedRegions,
  moveMuscleSideCentroid,
  parseCalibrationTarget,
  resetCalibratedRegions,
  saveCalibratedRegions,
  sideDisplayLabel,
} from '../utils/muscleRegionUtils';

function CalibrateMarker({ targetKey, label, center, isSelected, isLocked, hitLayerRef, onMoveTarget }) {
  const dragRef = useRef(null);

  const endMarkerDrag = () => {
    document.removeEventListener('mousemove', onMarkerDrag);
    document.removeEventListener('mouseup', endMarkerDrag);
    document.removeEventListener('touchmove', onMarkerDrag);
    document.removeEventListener('touchend', endMarkerDrag);
    dragRef.current = null;
  };

  const onMarkerDrag = (event) => {
    if (!dragRef.current || !hitLayerRef.current) return;
    event.preventDefault();
    const point = getPercentPointInHitLayer(event, hitLayerRef.current);
    if (!point) return;
    onMoveTarget(dragRef.current, point);
  };

  const startMarkerDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = targetKey;
    document.addEventListener('mousemove', onMarkerDrag);
    document.addEventListener('mouseup', endMarkerDrag);
    document.addEventListener('touchmove', onMarkerDrag, { passive: false });
    document.addEventListener('touchend', endMarkerDrag);
  };

  return (
    <button
      type="button"
      className={`calibrate-marker ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`}
      style={{ left: `${center.x}%`, top: `${center.y}%` }}
      title={label}
      onMouseDown={startMarkerDrag}
      onTouchStart={startMarkerDrag}
      onClick={(e) => e.stopPropagation()}
    >
      <span>{label}</span>
    </button>
  );
}

function BodyFigure({
  title,
  imageSrc,
  view,
  regions,
  activeTargetKey,
  calibrateMode,
  selectedCalibrateTarget,
  lockedTargetKeys,
  onMuscleHover,
  onMuscleSelect,
  onMoveTarget,
}) {
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const hitLayerRef = useRef(null);
  const [hitLayerStyle, setHitLayerStyle] = useState(null);
  const viewRegions = regions[view];

  const syncHitLayer = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const rect = getObjectFitContainRect(
      viewport.clientWidth,
      viewport.clientHeight,
      BODY_FIGURE_NATURAL.width,
      BODY_FIGURE_NATURAL.height
    );

    if (rect) {
      setHitLayerStyle({
        left: `${rect.x}px`,
        top: `${rect.y}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      });
    }
  }, []);

  useLayoutEffect(() => {
    syncHitLayer();
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const observer = new ResizeObserver(syncHitLayer);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [syncHitLayer, imageSrc]);

  const resolveMuscleFromEvent = (event) => {
    const point = getPercentPointInHitLayer(event, hitLayerRef.current);
    if (!point) return null;
    return findMuscleAtPoint(point, view, regions);
  };

  const handlePointerMove = (event) => {
    if (calibrateMode) return;
    const found = resolveMuscleFromEvent(event);
    onMuscleHover(found?.id ?? null, found);
  };

  const handlePointerLeave = () => {
    if (calibrateMode) return;
    onMuscleHover(null, null);
  };

  const handleClick = (event) => {
    if (calibrateMode) return;
    const found = resolveMuscleFromEvent(event);
    onMuscleSelect(found?.id ?? null, found);
  };

  const calibrationMarkers = useMemo(() => {
    if (!calibrateMode) return [];
    return Object.entries(viewRegions).flatMap(([muscleId, muscle]) =>
      getMuscleSides(muscle).map(({ sideKey }) => {
        const poly = getSidePolygon(muscle, sideKey);
        return {
          targetKey: calibrationTargetKey(muscleId, sideKey),
          muscleId,
          sideKey,
          label: sideDisplayLabel(muscle, sideKey),
          center: computeCentroid(poly),
        };
      })
    );
  }, [calibrateMode, viewRegions]);

  return (
    <article className={`body-card ${calibrateMode ? 'calibrate-target' : ''}`}>
      <div
        className="body-figure-viewport"
        ref={viewportRef}
        style={{
          width: BODY_FIGURE_VIEW.width,
          height: BODY_FIGURE_VIEW.height,
        }}
        role="img"
        aria-label={`${title} muscle map, ${view} view`}
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt=""
          className="body-figure-image"
          onLoad={syncHitLayer}
        />

        {hitLayerStyle ? (
          <div
            ref={hitLayerRef}
            className="body-figure-hit-layer"
            style={hitLayerStyle}
            onMouseMove={handlePointerMove}
            onMouseLeave={handlePointerLeave}
            onClick={handleClick}
          >
            <svg className="body-figure-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {Object.entries(viewRegions).flatMap(([muscleId, muscle]) =>
                getMuscleSides(muscle).map(({ sideKey, polygon }) => {
                  const targetKey = calibrationTargetKey(muscleId, sideKey);
                  const isActive =
                    activeTargetKey === targetKey || selectedCalibrateTarget === targetKey;
                  return (
                    <polygon
                      key={targetKey}
                      points={polygon.map(([x, y]) => `${x},${y}`).join(' ')}
                      className={`muscle-zone ${isActive ? 'is-active' : ''} ${
                        lockedTargetKeys.has(targetKey) ? 'is-locked' : ''
                      }`}
                    />
                  );
                })
              )}
            </svg>

            {calibrateMode &&
              calibrationMarkers.map((marker) => (
                <CalibrateMarker
                  key={`${title}-${marker.targetKey}`}
                  targetKey={marker.targetKey}
                  label={marker.label}
                  center={marker.center}
                  isSelected={selectedCalibrateTarget === marker.targetKey}
                  isLocked={lockedTargetKeys.has(marker.targetKey)}
                  hitLayerRef={hitLayerRef}
                  onMoveTarget={onMoveTarget}
                />
              ))}
          </div>
        ) : null}
      </div>
      <p className="body-card-label">{title}</p>
    </article>
  );
}

function MuscleMap() {
  const [view, setView] = useState('front');
  const [regions, setRegions] = useState(() => loadCalibratedRegions());
  const [hoveredMuscle, setHoveredMuscle] = useState(null);
  const [pinnedMuscle, setPinnedMuscle] = useState(null);
  const [lastSide, setLastSide] = useState('');
  const [calibrateMode, setCalibrateMode] = useState(false);
  const [selectedCalibrateTarget, setSelectedCalibrateTarget] = useState(null);
  const [lockedByView, setLockedByView] = useState({ front: new Set(), back: new Set() });
  const [calibrateMessage, setCalibrateMessage] = useState('');

  const calibrationTargets = useMemo(() => getCalibrationTargets(regions[view]), [regions, view]);
  const lockedTargetKeys = lockedByView[view];
  const displayMuscle = pinnedMuscle || hoveredMuscle;

  const activeTargetKey = displayMuscle
    ? calibrationTargetKey(displayMuscle.id, displayMuscle.sideKey)
    : null;

  const switchView = (nextView) => {
    setView(nextView);
    setHoveredMuscle(null);
    setPinnedMuscle(null);
    setLastSide('');
    if (calibrateMode) {
      const targets = getCalibrationTargets(regions[nextView]);
      setSelectedCalibrateTarget(targets[0]?.targetKey ?? null);
    }
  };

  const startCalibrate = () => {
    setCalibrateMode(true);
    setPinnedMuscle(null);
    setHoveredMuscle(null);
    setSelectedCalibrateTarget(calibrationTargets[0]?.targetKey ?? null);
    setCalibrateMessage(
      'Drag each Left/Right marker on both bodies. Male and female use the same map — zones match exactly.'
    );
  };

  const finishCalibrate = () => {
    saveCalibratedRegions(regions);
    setCalibrateMode(false);
    setCalibrateMessage('Positions saved. Explore mode is active for both bodies.');
  };

  const resetCalibration = () => {
    const defaults = resetCalibratedRegions();
    setRegions(defaults);
    setLockedByView({ front: new Set(), back: new Set() });
    const targets = getCalibrationTargets(defaults[view]);
    setSelectedCalibrateTarget(targets[0]?.targetKey ?? null);
    setCalibrateMessage('Reset to default positions.');
  };

  const lockCurrentTarget = () => {
    if (!selectedCalibrateTarget) return;
    const nextLocked = new Set(lockedTargetKeys);
    nextLocked.add(selectedCalibrateTarget);
    setLockedByView((prev) => ({ ...prev, [view]: nextLocked }));

    const nextTarget = calibrationTargets.find((t) => !nextLocked.has(t.targetKey));
    setSelectedCalibrateTarget(nextTarget?.targetKey ?? selectedCalibrateTarget);

    const current = calibrationTargets.find((t) => t.targetKey === selectedCalibrateTarget);
    setCalibrateMessage(
      nextTarget
        ? `Locked ${current?.chipLabel}. Now place: ${nextTarget.chipLabel}`
        : `All ${view} zones locked. Switch view or click Save positions.`
    );
  };

  const handleMoveTarget = (targetKey, point) => {
    const { muscleId, sideKey } = parseCalibrationTarget(targetKey);
    setRegions((prev) => moveMuscleSideCentroid(prev, view, muscleId, sideKey, point));
    setSelectedCalibrateTarget(targetKey);
  };

  const handleMuscleHover = (muscleId, muscleData, bodyTitle) => {
    if (muscleId && muscleData) {
      setHoveredMuscle(muscleData);
      setLastSide(bodyTitle);
      return;
    }
    if (!pinnedMuscle) setHoveredMuscle(null);
  };

  const handleMuscleSelect = (muscleId, muscleData, bodyTitle) => {
    if (muscleId && muscleData) {
      setPinnedMuscle(muscleData);
      setHoveredMuscle(muscleData);
      setLastSide(bodyTitle);
      return;
    }
    setPinnedMuscle(null);
    setHoveredMuscle(null);
  };

  const maleImage = `/images/male-${view}.png`;
  const femaleImage = `/images/female-${view}.png`;

  return (
    <section className="muscle-map-section">
      <div className="muscle-map-hero">
        <h1>Muscle Map</h1>
        <p>
          {calibrateMode
            ? 'Calibrate each muscle side (Left / Right) separately. Both bodies share the same size and zone map.'
            : 'New to the gym? Move your pointer over the muscles to learn key training areas.'}
        </p>
      </div>

      <div className="toggle-view-buttons">
        <button type="button" className={view === 'front' ? 'active' : ''} onClick={() => switchView('front')}>
          Front view
        </button>
        <button type="button" className={view === 'back' ? 'active' : ''} onClick={() => switchView('back')}>
          Back view
        </button>
        {MUSCLE_MAP_CALIBRATION_ENABLED &&
          (!calibrateMode ? (
            <button type="button" className="calibrate-toggle-btn" onClick={startCalibrate}>
              Calibrate positions
            </button>
          ) : (
            <>
              <button type="button" className="calibrate-save-btn" onClick={finishCalibrate}>
                Save positions
              </button>
              <button type="button" className="calibrate-reset-btn" onClick={resetCalibration}>
                Reset defaults
              </button>
            </>
          ))}
      </div>

      {MUSCLE_MAP_CALIBRATION_ENABLED && calibrateMode ? (
        <div className="calibrate-toolbar">
          <div className="calibrate-muscle-list">
            {calibrationTargets.map((target) => (
              <button
                key={target.targetKey}
                type="button"
                className={`calibrate-muscle-chip ${selectedCalibrateTarget === target.targetKey ? 'active' : ''} ${
                  lockedTargetKeys.has(target.targetKey) ? 'done' : ''
                }`}
                onClick={() => setSelectedCalibrateTarget(target.targetKey)}
              >
                {target.chipLabel}
                {lockedTargetKeys.has(target.targetKey) ? ' ✓' : ''}
              </button>
            ))}
          </div>
          <div className="calibrate-actions">
            <button type="button" className="lock-muscle-btn" onClick={lockCurrentTarget}>
              Lock zone
            </button>
            <p className="calibrate-hint">{calibrateMessage}</p>
          </div>
        </div>
      ) : null}

      <div className="muscle-map-stage">
        <div className="body-figures-row">
          <BodyFigure
            title="Male"
            imageSrc={maleImage}
            view={view}
            regions={regions}
            activeTargetKey={activeTargetKey}
            calibrateMode={calibrateMode}
            selectedCalibrateTarget={selectedCalibrateTarget}
            lockedTargetKeys={lockedTargetKeys}
            onMuscleHover={(id, data) => handleMuscleHover(id, data, 'Male')}
            onMuscleSelect={(id, data) => handleMuscleSelect(id, data, 'Male')}
            onMoveTarget={handleMoveTarget}
          />
          <BodyFigure
            title="Female"
            imageSrc={femaleImage}
            view={view}
            regions={regions}
            activeTargetKey={activeTargetKey}
            calibrateMode={calibrateMode}
            selectedCalibrateTarget={selectedCalibrateTarget}
            lockedTargetKeys={lockedTargetKeys}
            onMuscleHover={(id, data) => handleMuscleHover(id, data, 'Female')}
            onMuscleSelect={(id, data) => handleMuscleSelect(id, data, 'Female')}
            onMoveTarget={handleMoveTarget}
          />
        </div>

        {!calibrateMode ? (
          <aside className="muscle-info-panel" aria-live="polite">
            <p className="muscle-info-kicker">
              {displayMuscle
                ? `${view === 'front' ? 'Front' : 'Back'} · ${lastSide}`
                : 'Hover a muscle'}
            </p>
            <h2 className="muscle-info-title">{displayMuscle?.displayLabel ?? '—'}</h2>
            <p className="muscle-scientific">
              {displayMuscle?.scientific ?? 'Scientific name appears here'}
            </p>
            <p className="muscle-tip">
              {displayMuscle?.tip ??
                'Move your pointer over the body. This panel stays fixed so the map does not jump.'}
            </p>
            <div className="muscle-info-actions">
              {pinnedMuscle ? (
                <button type="button" className="clear-pin-btn" onClick={() => setPinnedMuscle(null)}>
                  Clear selection
                </button>
              ) : (
                <span className="muscle-hint">Click a muscle to pin this info.</span>
              )}
            </div>
          </aside>
        ) : null}
      </div>

      {!calibrateMode ? (
        <ul className="muscle-legend">
          {Object.values(regions[view]).map((muscle) => (
            <li key={muscle.label}>{muscle.label}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default MuscleMap;
