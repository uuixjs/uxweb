import { HSLAColor, HSLColor } from "../types";
import clamp from "../util/clamp";
import extractComponents from "./extractComponents";

function parseHslComponent(component: string, i: number): number {
  const comp = parseFloat(component);

  switch (i) {
    case 0:
      return clamp(comp, 0, 360);
    case 1:
    case 2:
      return clamp(comp, 0, 100);
    case 3:
      return clamp(comp, 0, 1);
    default:
      return 0 as never;
  }
}

export function hsl(color: string): HSLColor | HSLAColor {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return extractComponents(color)!.map(parseHslComponent) as
    | HSLColor
    | HSLAColor;
}

export default hsl;
