export interface Point {
  x: number;
  y: number;
}

export function distanceToSegment(p: Point, from: Point, to: Point): number {
  const [dx, dy] = [to.x - from.x, to.y - from.y];
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared ? Math.max(0, Math.min(1, ((p.x - from.x) * dx + (p.y - from.y) * dy) / lengthSquared)) : 0;
  return Math.hypot(p.x - (from.x + t * dx), p.y - (from.y + t * dy));
}
