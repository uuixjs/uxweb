import { HSLAColor, HSLColor } from "../types";

export function hsl2string(hsl: HSLColor | HSLAColor): string {
  let scheme = "hsl";

  const hslParts: string[] = [];
  hslParts[0] = Math.round(hsl[0]).toString();
  hslParts[1] = Math.round(hsl[1]) + "%";
  hslParts[2] = Math.round(hsl[2]) + "%";

  if (hsl.length === 4) {
    scheme += "a";
    hslParts[3] = hsl[3].toString();
  }

  return scheme + "(" + hslParts.join(",") + ")";
}

export default hsl2string;
