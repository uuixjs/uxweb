import { RGBAColor, RGBColor } from "../types";

function expand(hexString: string): string {
  let result = "#";

  for (let i = 1; i < hexString.length; i++) {
    const val = hexString.charAt(i);
    result += val + val;
  }

  return result;
}

export function hex(hexString: string): RGBColor | RGBAColor {
  // #RGB or #RGBA
  if (hexString.length === 4 || hexString.length === 5) {
    hexString = expand(hexString);
  }

  const rgb = [
    parseInt(hexString.substring(1, 3), 16),
    parseInt(hexString.substring(3, 5), 16),
    parseInt(hexString.substring(5, 7), 16),
  ];

  // #RRGGBBAA
  if (hexString.length === 9) {
    const alpha = parseFloat(
      (parseInt(hexString.substring(7, 9), 16) / 255).toFixed(2),
    );
    rgb.push(alpha);
  }

  return rgb as RGBColor | RGBAColor;
}

export default hex;
