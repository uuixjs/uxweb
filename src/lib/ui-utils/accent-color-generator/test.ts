import { HSLColor, RGBColor, hsl2rgb, parse, rgb2hsl } from "lib/pure-color";
import { accentColorGenerator, changeColor } from ".";
import { contrast, luminance } from "../color";

import { DynamicThemeMap } from "lib/ui-tokens";
import { TEST_COLORS } from "../tests/data/colors";

const LIGHT_ALT_2 = parse(
  DynamicThemeMap.light["color-background-alt-2"],
) as RGBColor;
const DARK_ALT_2 = parse(
  DynamicThemeMap.dark["color-background-alt-2"],
) as RGBColor;
const WHITE_RGB: RGBColor = [255, 255, 255];

describe("accentColorGenerator", () => {
  it("generates the expected number of colors", () => {
    const colors = accentColorGenerator([100, 100, 100]);
    expect(colors.length).toBe(5);
  });

  it.each([
    // RGB colors:
    [255, 255, 255],
    [0, 0, 0],
    [100, 150, 200],
  ])(
    "generates a scale of color from dark to light, given rgb(%s,%s,%s)",
    (r, g, b) => {
      const colors = accentColorGenerator([r, g, b]);

      expect(luminance(colors[0])).toBeLessThan(luminance(colors[1]));
      expect(luminance(colors[1])).toBeLessThan(luminance(colors[2]));
      expect(luminance(colors[2])).toBeLessThan(luminance(colors[3]));
      expect(luminance(colors[3])).toBeLessThan(luminance(colors[4]));
    },
  );

  // Grouping assertions into one test because of extremely long list of colors to test.
  it.each(TEST_COLORS)(
    "meets contrast requirements, given input color rgb(%s,%s,%s)",
    (r, g, b) => {
      const colors = accentColorGenerator([r, g, b]);

      // Pairs of colors to colors
      expect(contrast(colors[0], colors[3])).toBeGreaterThanOrEqual(4.5);
      expect(contrast(colors[1], colors[4])).toBeGreaterThanOrEqual(4.5);

      // Light theme pairs
      expect(contrast(colors[0], LIGHT_ALT_2)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(colors[1], LIGHT_ALT_2)).toBeGreaterThanOrEqual(4.5);

      // Dark theme pairs
      expect(contrast(colors[3], DARK_ALT_2)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(colors[4], DARK_ALT_2)).toBeGreaterThanOrEqual(4.5);

      // Pairs with white
      expect(contrast(colors[0], WHITE_RGB)).toBeGreaterThan(4.5);
      expect(contrast(colors[1], WHITE_RGB)).toBeGreaterThan(4.5);
      expect(contrast(colors[2], WHITE_RGB)).toBeGreaterThan(4.5);
    },
  );

  it.each([
    // RGB colors:
    [150, 100, 250],
    [255, 100, 250],
    [100, 255, 0],
  ])("does not convert color to grayscale, given rgb(%s,%s,%s)", (r, g, b) => {
    const colors = accentColorGenerator([r, g, b]);
    const [r1, b1, g1] = colors[0];
    expect(r1).not.toEqual(g1);
    expect(b1).not.toEqual(g1);
    const [r2, b2, g2] = colors[1];
    expect(r2).not.toEqual(g2);
    expect(b2).not.toEqual(g2);
  });

  it.each([
    // RGB colors:
    [0, 0, 10],
    [0, 10, 0],
    [10, 0, 0],
  ])(
    "darkest color is similar to input for dark colors, given rgb(%s,%s,%s)",
    (r, g, b) => {
      const colors = accentColorGenerator([r, g, b]);
      const [r5, b5, g5] = colors[0];
      expect(contrast([r, b, b], [r5, b5, g5])).toBeLessThan(1.2); // arbitrary contrast threshhold
    },
  );

  it.each([
    // RGB colors:
    [0, 0, 10],
    [0, 10, 0],
    [10, 0, 0],
  ])(
    "desaturates when input color is very dark, given rgb(%s,%s,%s)",
    (r, g, b) => {
      const [, s] = rgb2hsl([r, g, b]);
      const colors = accentColorGenerator([r, g, b]);
      const lightestColor = colors[colors.length - 1];
      const [, s1] = rgb2hsl(lightestColor);
      expect(s1).toBeLessThan(s);
    },
  );

  it.each([
    // RGB colors:
    [255, 255, 250],
    [255, 250, 255],
    [250, 255, 255],
  ])(
    "desaturates when input color is very light, given rgb(%s,%s,%s)",
    (r, g, b) => {
      const [, s] = rgb2hsl([r, g, b]);
      const colors = accentColorGenerator([r, g, b]);
      const darkestColor = colors[0];
      const [, s1] = rgb2hsl(darkestColor);
      expect(s1).toBeLessThan(s);
    },
  );

  it.each([
    // RGB colors:
    [200, 200, 100],
    [200, 100, 200],
    [100, 200, 200],
  ])(
    "does not desaturate when input color has middle lightness, given rgb(%s,%s,%s)",
    (r, g, b) => {
      const [, s] = rgb2hsl([r, g, b]);
      const colors = accentColorGenerator([r, g, b]);
      const lightestColor = colors[colors.length - 1];
      const [, s1] = rgb2hsl(lightestColor);
      expect(Math.round(s1)).toEqual(Math.round(s));
    },
  );
});

describe("changeColor", () => {
  it("darkens colors", () => {
    const input: HSLColor = [60, 98, 49];
    const result = changeColor(input, 4.5);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBeGreaterThan(4.5);
  });

  it("lightens colors", () => {
    const input: HSLColor = [0, 0, 4];
    const result = changeColor(input, 4.5, undefined, true);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBeGreaterThan(4.5);
  });

  it.each([
    // Random set of light HSL colors:
    [60, 98, 49],
    [84, 98, 49],
    [62, 98, 49],
    [65.5, 98.2, 43.5],
  ])("accurately darkens the color hsl(%s,%s,%s)", (h, s, l) => {
    const input: HSLColor = [h, s, l];
    const result = changeColor(input, 4.5);

    const ratio = contrast(hsl2rgb(result), hsl2rgb(input));
    const diff = Math.abs(ratio - 4.5);

    expect(diff).toBeLessThan(0.1);
  });

  it.each([
    // Random set of dark HSL colors:
    [0, 0, 4],
    [210, 16.7, 23.5],
    [347, 64, 22],
    [240, 100, 4],
  ])("accurately lightens the color hsl(%s,%s,%s)", (h, s, l) => {
    const input: RGBColor = [h, s, l];
    const result = changeColor(input, 4.5, undefined, true);

    const ratio = contrast(hsl2rgb(result), hsl2rgb(input));
    const diff = Math.abs(ratio - 4.5);

    expect(diff).toBeLessThan(0.1);
  });

  it("can darken white", () => {
    const input: HSLColor = [0, 0, 100];
    const result = changeColor(input, 4.5);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBeGreaterThan(4.5);

    // First two values of HSL should be 0 - color should be gray
    const [h, s] = result;
    expect(h).toEqual(0);
    expect(s).toEqual(0);
  });

  it("can lighten black", () => {
    const input: HSLColor = [0, 0, 0];
    const result = changeColor(input, 4.5, undefined, true);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBeGreaterThan(4.5);

    // First two values of HSL should be 0 - color should be gray
    const [h, s] = result;
    expect(h).toEqual(0);
    expect(s).toEqual(0);
  });

  it("handles contrast ratio of 1", () => {
    const input: HSLColor = [200, 94, 69];
    const result = changeColor(input, 1);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBe(1);
    expect(input).toEqual(result);
  });

  it("handles contrast ratio of 1 with identical compare color", () => {
    const input: HSLColor = [200, 94, 69];
    const result = changeColor(input, 1, input);

    expect(contrast(hsl2rgb(result), hsl2rgb(input))).toBe(1);
    expect(input).toEqual(result);
  });

  it("Does not darken beyond black", () => {
    const input: HSLColor = [210, 50, 8];
    const [, , l] = changeColor(input, 4.5);

    expect(l).toEqual(0);
  });

  it("Does not lighten beyond white", () => {
    const input: HSLColor = [280, 100, 97];
    const [, , l] = changeColor(input, 4.5, undefined, true);

    expect(l).toEqual(100);
  });

  it.each([
    [0, 100, 81.4], // contrast to white: 1.94
    [120, 100, 81.4], // contrast to white: 1.21
    [240, 100, 85.3], // contrast to white: 1.92
    [30, 100, 96.1], // contrast to white: 1.07
  ])("darkens hsl(%s,%s,%s) using white as the compare color", (h, s, l) => {
    const WHITE_HSL: HSLColor = [0, 0, 100];
    const input: HSLColor = [h, s, l];
    const regularResult = changeColor(input, 2, undefined);
    const compareResult = changeColor(input, 2, WHITE_HSL);

    // Whe contrasted against itself, result should be darker than when contrasted against white
    expect(compareResult).not.toEqual(regularResult);

    // When contrasted against white, it must:
    expect(contrast(hsl2rgb(compareResult), WHITE_RGB)).toBeGreaterThan(2);
    expect(contrast(hsl2rgb(compareResult), WHITE_RGB)).toBeLessThan(2.1); // assert it is accurate
  });

  it("does not change colors that already meet requirements", () => {
    const WHITE_HSL: HSLColor = [0, 0, 100];
    const input: HSLColor = [210, 16.7, 47.1]; // contrast to white: 4.55...
    const result = changeColor(input, 4.5, WHITE_HSL);

    expect(result).toEqual(input);
  });
});
