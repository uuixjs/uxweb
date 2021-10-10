import { HSVColor, RGBColor } from "../types";

export function rgb2hsv(rgb: RGBColor): HSVColor {
  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h = 0;
  const s = max === 0 ? 0 : ((delta / max) * 1000) / 10;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const v = ((max / 255) * 1000) / 10;

  return [h, s, v];
}

export default rgb2hsv;
