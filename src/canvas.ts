/**
 * Keeps a canvas's backing store matched to its size on screen, with at most `maxDensity` pixels per
 * CSS pixel: soft dirt and water look the same at 2x or 1x and cost far fewer pixels than 3x.
 */
export function fitCanvas(canvas: HTMLCanvasElement, maxDensity: number, onResize?: () => void): void {
  new ResizeObserver(() => {
    const density = Math.min(devicePixelRatio, maxDensity);
    canvas.width = Math.round(canvas.clientWidth * density);
    canvas.height = Math.round(canvas.clientHeight * density);
    onResize?.();
  }).observe(canvas);
}

/** Clears the canvas and scales drawing so that `unitsAcross` units span its width. */
export function clearScaled(g: CanvasRenderingContext2D, unitsAcross: number): void {
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, g.canvas.width, g.canvas.height);
  const scale = g.canvas.width / unitsAcross;
  g.setTransform(scale, 0, 0, scale, 0, 0);
}

/** Fills many circles in one colour and opacity with a single draw call. */
export function fillCircles(
  g: CanvasRenderingContext2D,
  circles: { x: number; y: number; r: number }[],
  color: string,
  alpha: number,
): void {
  g.fillStyle = color;
  g.globalAlpha = alpha;
  g.beginPath();
  for (const c of circles) {
    g.moveTo(c.x + c.r, c.y);
    g.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  }
  g.fill();
  g.globalAlpha = 1;
}
