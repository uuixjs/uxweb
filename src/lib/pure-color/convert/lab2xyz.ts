import { LABColor, XYZColor } from "../types";

export function lab2xyz(lab: LABColor): XYZColor {
  const l = lab[0];
  const a = lab[1];
  const b = lab[2];

  let y;
  let y2;

  if (l <= 8) {
    y = (l * 100) / 903.3;
    y2 = 7.787 * (y / 100) + 16 / 116;
  } else {
    y = 100 * Math.pow((l + 16) / 116, 3);
    y2 = Math.pow(y / 100, 1 / 3);
  }

  // I'm pretty sure this was a bug in this library, as x and z were
  // always undefined, resulting in comparisons to NaN and thus always
  // the falsy branch

  // x =
  //   x / 95.047 <= 0.008856
  //     ? (x = (95.047 * (a / 500 + y2 - 16 / 116)) / 7.787)
  //     : 95.047 * Math.pow(a / 500 + y2, 3);
  const x = 95.047 * Math.pow(a / 500 + y2, 3);

  // z =
  //   z / 108.883 <= 0.008859
  //     ? (z = (108.883 * (y2 - b / 200 - 16 / 116)) / 7.787)
  //     : 108.883 * Math.pow(y2 - b / 200, 3);
  const z = 108.883 * Math.pow(y2 - b / 200, 3);

  return [x, y, z];
}

export default lab2xyz;
