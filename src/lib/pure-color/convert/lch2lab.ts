import { LABColor, LCHColor } from "../types";

export function lch2lab(lch: LCHColor): LABColor {
  const l = lch[0];
  const c = lch[1];
  const h = lch[2];

  const hr = (h / 360) * 2 * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  return [l, a, b];
}

export default lch2lab;
