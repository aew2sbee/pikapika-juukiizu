export interface Vehicle {
  name: string;
  /** viewBox size the shapes are drawn in. */
  width: number;
  height: number;
  /**
   * SVG elements (without the root <svg>). The face is a `.face` group; each of its parts lists the
   * moods it shows in with `data-moods` ("normal", "happy" once clean, "fussy" while water hits the face).
   */
  shapes: string;
}
