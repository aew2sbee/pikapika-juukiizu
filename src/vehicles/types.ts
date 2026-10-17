import type { Point } from '../geometry';

export interface Vehicle {
  name: string;
  /** viewBox size the shapes are drawn in. */
  width: number;
  height: number;
  /**
   * SVG elements (without the root <svg>). The face has `.eyes`, `.mouth-normal`, `.mouth-happy` and
   * `.cheeks` (shown when clean), and `.eyes-fussy` and `.mouth-fussy` (shown while water hits it).
   */
  shapes: string;
  /** The face, in viewBox units: water held inside this circle makes the vehicle fuss. */
  face: Point & { r: number };
}
