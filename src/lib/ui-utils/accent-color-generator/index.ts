import { HSLColor, RGBColor, hsl2rgb, rgb2hsl } from "lib/pure-color";
import {
  colorIsDark,
  contrast,
  easeOutQuad,
  easeOutQuint,
  luminance,
  roundRGB,
} from "../color";

export type AccentColorList = [
  RGBColor,
  RGBColor,
  RGBColor,
  RGBColor,
  RGBColor,
];

/**
 * Generates a set of similar colors based on a given input color.
 *
 *   - Guarantees minimum accessible contrast ratio between colors 1 and 4
 *   - Guarantees minimum accessible contrast ratio between colors 2 and 5
 *   - Guarantees minimum accessible contrast ratio between colors 1 or 2 and light theme background
 *   - Guarantees minimum accessible contrast ratio between colors 5 or 6 and dark theme background
 *
 * @param rgb Input color, represented as an array of three numbers from 0 through 255
 */
export function accentColorGenerator(rgb: RGBColor): AccentColorList {
  const lum = luminance(rgb);
  const [h, s, l] = rgb2hsl(rgb);

  const minLum = 0.3;
  const maxLum = 0.9;

  // Desaturation curve for very dark or very light colors
  let sat = 1; // between 0 and 1, amount of saturation to retain
  if (lum < minLum) {
    sat = easeOutQuint(lum / minLum);
  } else if (lum > maxLum) {
    sat = easeOutQuad((1 - lum) / (1 - maxLum));
  }

  let color5: HSLColor = [h, s * sat, l];

  // Lighten color to have minimum luminance
  if (lum < minLum) {
    const ratio = (minLum + 0.05) / (lum + 0.05);
    color5 = changeColor(color5, ratio, [h, s, l], true);
  }

  // Two calls to changeColor for some items below ensure minimum contrast to both the prior color in the palette and an additional color.
  const color4 = changeColor(color5, 1.1);
  const color3 = changeColor(changeColor(color4, 1.3), 4.5, [0, 0, 100]);
  const color2 = changeColor(changeColor(color3, 1.3), 4.5, color5);
  const color1 = changeColor(changeColor(color2, 1.3), 4.5, color4);

  // We wait to convert back to RGB until the end because it is a lossy conversion
  return [
    roundRGB(hsl2rgb(color1)),
    roundRGB(hsl2rgb(color2)),
    roundRGB(hsl2rgb(color3)),
    roundRGB(hsl2rgb(color4)),
    roundRGB(hsl2rgb(color5)),
  ];
}

/**
 * Generates a slightly different shade of the input color which
 * may be lighter or darker. This special color is intended for use
 * as a hover color when the original input color is used on a button.
 *
 * @param rgb Input color
 */
export function getHoverColor(rgb: RGBColor): RGBColor {
  const isDark = colorIsDark(rgb);
  const hsl = rgb2hsl(rgb);
  const ratio = isDark ? 1.35 : 1.2;
  const result = changeColor(hsl, ratio, undefined, isDark);

  return roundRGB(hsl2rgb(result));
}

/**
 * Changes a color to be ligher or darker and ensures the new color has a minimum
 * contrast ratio to a target color. Will not darken beyond black and
 * will not lighten beyond white.
 *
 * @param input Input color, represented as an array of three numbers of an HSL color
 * @param minContrast float - Desired *minimum* contrast ratio. Value of '1' means no change, '1.1' means slight change, etc.
 * @param compare Color to be used to calculate contrast against the result. Defaults to input color.
 * @param lighter boolean - If true, makes color ligher. If false, makes color darker.
 */
export function changeColor(
  input: HSLColor,
  minContrast: number,
  compare?: HSLColor,
  lighter: boolean = false,
): HSLColor {
  // eslint-disable-next-line prefer-const
  let [h, s, l] = input;

  if (compare === undefined) {
    compare = input;
  }

  // It is important to round RGB values before comparing contrast because
  // we anticipate the color will later be converted back to RGB and rounded at that time.
  let newContrast = contrast(
    roundRGB(hsl2rgb(input)),
    roundRGB(hsl2rgb(compare)),
  );

  while (
    newContrast < minContrast &&
    ((!lighter && l > 0) || (lighter && l < 100))
  ) {
    if (lighter) {
      l += 0.1;
      l = Math.min(l, 100);
    } else {
      l -= 0.1;
      l = Math.max(l, 0);
    }

    newContrast = contrast(
      roundRGB(hsl2rgb(compare)),
      roundRGB(hsl2rgb([h, s, l])),
    );
  }

  return [h, s, l];
}
