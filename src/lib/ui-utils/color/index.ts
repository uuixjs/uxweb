import { RGBColor } from "lib/pure-color";

/**
 * If a string representing a hex color is provided,
 * ensure it starts with "#" otherwise return the
 * original unmodified string
 *
 * Examples:
 *
 *    Input: "fff"               Returns: "#fff"
 *    Input: "#000000"           Returns: "#000000"
 *    Input: "rgb(255,255,255)"  Returns: "rgb(255,255,255)"
 *
 * @param value Any string which may or may not represent a hex color
 */
export function formatColor(value: string): string {
  const HEX_REGEX = /^[A-Fa-f0-9]{3,6}$/;
  if (HEX_REGEX.test(value)) {
    return "#" + value;
  }

  return value;
}

/**
 * Calculate relative luminance of two colors, as defined by W3C:
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 */
export function luminance([r, g, b]: RGBColor): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculate contrast of two colors, as defined by W3C:
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 */
export function contrast(rgb1: RGBColor, rgb2: RGBColor) {
  const l1 = luminance(rgb1) + 0.05;
  const l2 = luminance(rgb2) + 0.05;
  if (l1 > l2) {
    return l1 / l2;
  } else {
    return l2 / l1;
  }
}

/**
 * Rounds a set off RGB float values to integers;
 * only integers are valid RGB values.
 */
export function roundRGB(rgb: RGBColor): RGBColor {
  rgb[0] = Math.round(rgb[0]);
  rgb[1] = Math.round(rgb[1]);
  rgb[2] = Math.round(rgb[2]);
  return rgb;
}

/**
 * Returns `true` if color has contrast to white of at least 4.5
 *
 * @param rgb Color to test
 */
export function colorIsDark(rgb: RGBColor): boolean {
  return contrast(rgb, [255, 255, 255]) >= 4.5;
}

/**
 * Easing function for numbers between 0 and 1 only
 *
 * @param t number between 0 and 1
 */
export const easeOutQuad = (t: number) => t * (2 - t);
export const easeOutQuint = (t: number) => 1 + --t * t * t * t * t;
