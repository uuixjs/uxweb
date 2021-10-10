import { LABColor, LCHColor } from "../types";

export function lab2lch(lab: LABColor): LCHColor {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];

  const hr = Math.atan2(b, a);
  let h = (hr * 360) / 2 / Math.PI;
  if (h < 0) {
    h += 360;
  }
  const c = Math.sqrt(a * a + b * b);

  return [l, c, h];
}

export default lab2lch;
