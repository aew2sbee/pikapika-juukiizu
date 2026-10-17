export interface Vehicle {
  name: string;
  /** viewBox size the shapes are drawn in. */
  width: number;
  height: number;
  /**
   * SVG elements (without the root <svg>). The face swaps `.mouth-normal` for `.mouth-happy`
   * and shows `.cheeks` when clean.
   */
  shapes: string;
}
