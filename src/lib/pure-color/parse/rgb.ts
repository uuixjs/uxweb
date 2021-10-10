import { RGBAColor, RGBColor } from "../types";
import clamp from "../util/clamp";
import extractComponents from "./extractComponents";

function parseRgbComponent(component: string, i: number): number {
  if (i < 3) {
    if (component.indexOf("%") !== -1) {
      return Math.round((255 * clamp(parseInt(component, 10), 0, 100)) / 100);
    } else {
      return clamp(parseInt(component, 10), 0, 255);
    }
  } else {
    return clamp(parseFloat(component), 0, 1);
  }
}

export function rgb(color: string): RGBColor | RGBAColor {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return extractComponents(color)!.map(parseRgbComponent) as
    | RGBColor
    | RGBAColor;
}

export default rgb;
