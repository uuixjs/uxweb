import { CMYKColor, RGBColor } from "../types";

export function cmyk2rgb(cmyk: CMYKColor): RGBColor {
  const c = cmyk[0] / 100;
  const m = cmyk[1] / 100;
  const y = cmyk[2] / 100;
  const k = cmyk[3] / 100;

  const r = 1 - Math.min(1, c * (1 - k) + k);
  const g = 1 - Math.min(1, m * (1 - k) + k);
  const b = 1 - Math.min(1, y * (1 - k) + k);

  return [r * 255, g * 255, b * 255];
}

export default cmyk2rgb;
