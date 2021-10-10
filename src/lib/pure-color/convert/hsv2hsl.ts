import { HSLColor, HSVColor } from "../types";

export function hsv2hsl(hsv: HSVColor): HSLColor {
  const h = hsv[0];
  const s = hsv[1] / 100;
  const v = hsv[2] / 100;

  let l = (2 - s) * v;
  let sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return [h, sl * 100, l * 100];
}

export default hsv2hsl;
