import { HSLColor, HSVColor } from "../types";

export function hsl2hsv(hsl: HSLColor): HSVColor {
  const h = hsl[0];
  let s = hsl[1] / 100;
  let l = hsl[2] / 100;

  if (l === 0) {
    // no need to do calc on black
    // also avoids divide by 0 error
    return [0, 0, 0];
  }

  l *= 2;
  s *= l <= 1 ? l : 2 - l;
  const v = (l + s) / 2;
  const sv = (2 * s) / (l + s);

  return [h, sv * 100, v * 100];
}

export default hsl2hsv;
