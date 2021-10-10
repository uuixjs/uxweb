import {
  capitalize,
  fixPropertyName,
  formatCssValue,
  formatIOSPropertyNameFromPath,
  formatIOSValue,
  formatRawPropertyNameFromPath,
  formatThemePropertyName,
  hasCssKeywordValue,
} from ".";

import { Property } from "../types";

describe("utils", () => {
  it("formatThemePropertyName removes the theme name prefix", () => {
    const testName = "theme-dark-color-background-body";

    expect(formatThemePropertyName(testName, "dark")).toBe(
      "color-background-body",
    );
  });

  it("fixPropertyName removes duplicate prefixes from property names", () => {
    const testValue = "twitchTwitchPurple7";
    expect(fixPropertyName(testValue)).toEqual("twitchPurple7");
  });

  it("formatCssValue converts an original value to a css value reference value", () => {
    const testProperty = {
      original: {
        value: "{color.twitch-purple.value}",
      },
    };
    expect(formatCssValue(testProperty as Property)).toEqual(
      "var(--color-twitch-purple)",
    );
  });

  it("formatCssValue uses the actual value when the original value does not reference a property", () => {
    const testProperty = {
      value: "#000000",
      original: {
        value: { h: 0, s: 0, l: 0 },
      },
    };
    expect(formatCssValue(testProperty as Property)).toEqual("#000000");
  });

  it("formatIOSValue returns the actual value when original value does not reference a property", () => {
    const testProperty = {
      value:
        "UIColor(red: 0.9647, green: 0.3255, blue: 0.3176, alpha:1) /* #f65351 */",
      original: { value: { h: 1, s: 90, l: 42 } },
    };
    expect(formatIOSValue(testProperty as Property)).toEqual(
      "UIColor(red: 0.9647, green: 0.3255, blue: 0.3176, alpha:1) /* #f65351 */",
    );
  });

  it("formatIOSValue converts an original value to an iOS reference value", () => {
    const testColorProperty = {
      original: { value: "{color.opac-w-5.value}" },
    };
    const testThemeProperty = {
      original: { value: "{themes.light.color-text-base.value}" },
    };

    expect(formatIOSValue(testColorProperty as Property)).toEqual(
      ".twitchOpacW5",
    );
    expect(formatIOSValue(testThemeProperty as Property)).toEqual(
      "textBaseColor",
    );
  });

  it("formatIOSPropertyNameFromPath formats an ios property name string from the path array", () => {
    const testPath = ["themes", "dark", "color-background-toggle-hover"];
    expect(formatIOSPropertyNameFromPath(testPath)).toEqual(
      "backgroundToggleHoverColor",
    );
  });

  it("formatRawPropertyNameFromPath formats a property name string from a path array", () => {
    const testPath = ["themes", "dark", "color-background-toggle-hover"];

    expect(formatRawPropertyNameFromPath(testPath)).toEqual(
      "background-toggle-hover",
    );
  });

  it("hasCssKeywordValue returns the correct boolean for a given value", () => {
    const testProperty = {
      value: "inherit",
    };
    expect(hasCssKeywordValue(testProperty as Property)).toEqual(true);

    testProperty.value = "#000000";
    expect(hasCssKeywordValue(testProperty as Property)).toEqual(false);
  });

  it("capitalize correctly capitalize the first letter of a string", () => {
    expect(capitalize("test string")).toEqual("Test string");
  });
});
