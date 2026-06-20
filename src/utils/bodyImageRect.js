/**
 * Pixel rect of the painted image inside a container using object-fit: contain
 * and object-position: center bottom (matches .body-figure-image CSS).
 */
export function getObjectFitContainRect(containerWidth, containerHeight, naturalWidth, naturalHeight) {
  if (!containerWidth || !containerHeight || !naturalWidth || !naturalHeight) {
    return null;
  }

  const scale = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  const x = (containerWidth - width) / 2;
  const y = containerHeight - height;

  return { x, y, width, height };
}

export function getPercentPointInHitLayer(event, hitLayerEl) {
  if (!hitLayerEl) return null;

  const rect = hitLayerEl.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;

  const source = event.touches ? event.touches[0] : event;
  const px = ((source.clientX - rect.left) / rect.width) * 100;
  const py = ((source.clientY - rect.top) / rect.height) * 100;

  return {
    x: Math.max(0, Math.min(100, px)),
    y: Math.max(0, Math.min(100, py)),
  };
}
