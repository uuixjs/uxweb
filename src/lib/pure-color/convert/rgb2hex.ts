import { RGBAColor, RGBColor } from "../types";
import clamp from "../util/clamp";

function componentToHex(c: number): string {
  const value = Math.round(clamp(c, 0, 255));
  const hex = value.toString(16);

  return hex.length === 1 ? "0" + hex : hex;
}

export function rgb2hex(rgb: RGBColor | RGBAColor): string {
  const alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

  return (
    "#" +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2]) +
    alpha
  );
}

export default rgb2hex;
