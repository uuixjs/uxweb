import hsl2rgb from "../convert/hsl2rgb";
import { HSLAColor, HSLColor, RGBAColor, RGBColor } from "../types";
import hex from "./hex";
import hsl from "./hsl";
import rgb from "./rgb";

export * from "./hex";
export * from "./hsl";
export * from "./rgb";

function hsl2rgbParse(color: string): RGBColor | RGBAColor {
  const h = hsl(color);
  const r = hsl2rgb(h);

  // handle alpha since hsl2rgb doesn't know (or care!) about it
  if (h.length === 4) {
    r.push(h[3]);
  }

  return r;
}

const space2parser = {
  "#": hex,
  hsl: hsl2rgbParse,
  rgb,
};

export function parse(
  color: string,
): HSLColor | HSLAColor | RGBColor | RGBAColor {
  for (const scheme in space2parser) {
    if (color.indexOf(scheme) === 0) {
      return space2parser[scheme as keyof typeof space2parser](color);
    }
  }

  return "" as never;
}

parse.rgb = rgb;
parse.hsl = hsl;
parse.hex = hex;

export default parse;
