export interface Vehicle {
  id: string;
  name: string;
  /** viewBox size of `svg`. */
  width: number;
  height: number;
  /**
   * Standalone SVG markup with xmlns, width and height (it is also loaded as an image to find the
   * silhouette). The face swaps `.mouth-normal` for `.mouth-happy` and shows `.cheeks` when clean.
   */
  svg: string;
}
