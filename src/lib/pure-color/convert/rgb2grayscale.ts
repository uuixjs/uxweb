import { RGBColor } from "../types";

export function rgb2grayscale(rgb: RGBColor): number {
  return (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
}

export default rgb2grayscale;
