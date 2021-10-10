import { Property } from "../types";
import { camelCase, kebabCase } from "lodash";

export const formatThemePropertyName = (name: string, themeKey: string) => {
  return name
    .split("-")
    .filter((i) => i !== "theme" || themeKey)
    .splice(2)
    .join("-");
};

/**
 * Removes duplicate prefixes.
 */
export const fixPropertyName = (name: string) => {
  return name.replace("twitchTwitch", "twitch");
};

/**
 * `style-dictionary` as of `v2.8.0` returns a UIColor string that
 * is missing a space following the colon after `alpha` key causing an
 * error in linters. This function finds instances where a space doesn't
 * follow a colon and adds that space.
 */
export const fixUiColor = (color: string) => {
  return color.replace(/:(?=[^ ])/, ": ");
};

/**
 * If the property references another property, convert the "original" value,
 * ie. `{color.twitch-purple.value}`, to a CSS variable, ie.
 * `var(--color-twitch-purple)`. Otherwise, return the actual value.
 */
export const formatCssValue = (property: Property) => {
  const originalValue = property.original.value;

  if (
    typeof originalValue === "string" &&
    originalValue.match(/({.*}|none|currentColor|transparent)/)
  ) {
    return String(property.original.value)
      .replace(/{themes.[a-zA-Z]*.|{/g, "var(--")
      .replace(/\.value/g, "")
      .replace(/\./g, "-")
      .replace(/\}/g, ")");
  } else {
    return property.value;
  }
};

/**
 * Formats the "original value" of the token to return a reference value
 * to either a color or theme token—for iOS.
 */
export const formatIOSValue = (property: Property) => {
  const originalValue = property.original.value;

  // If the orginal is an hsl object, ie. `{ h: 0, s: 0, l: 0 }`, than it is
  // not referencing a color or theme token and should return the
  // actual value.
  if (typeof originalValue === "object") {
    return property.value;
  }

  const originalValuePath = String(property.original.value)
    .toString()
    .replace(/(\{|\.value\})/g, "")
    .split(".");

  // If the original value references a theme property.
  if (originalValuePath[0] === "themes") {
    originalValuePath.push("color");
    return camelCase(
      originalValuePath
        .splice(2)
        .join("-")
        .replace(/^color-/, ""),
    );
  }

  // If the original value references a color property.
  if (originalValuePath[0] === "color") {
    return `.${fixPropertyName(
      camelCase(`twitch-${originalValuePath.splice(1).join("-")}`),
    )}`;
  }
};

/**
 * Formats a property name from the path array.
 */
export const formatIOSPropertyNameFromPath = (path: readonly string[]) => {
  // Remove `color-` prefix and attach at end.
  return camelCase(path[2].replace(/^color-/, "") + "-color");
};

/**
 * Returns the snake-cased token name that one would find
 * in Figma designs, to be used in code comments.
 */
export const formatRawPropertyNameFromPath = (path: readonly string[]) => {
  return kebabCase(path[2].replace(/^color-/, ""));
};

/**
 * Determines whether a property has an appropriate value for mobile platforms.
 */
export const hasCssKeywordValue = (token: Property) => {
  const ignoredCssKeywords = ["transparent", "inherit", "currentColor", "none"];
  return !!ignoredCssKeywords.find((value) => token.value === value);
};

/**
 * Returns a string with the first character capitalized.
 */
export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Sorts properties alphabetically by their name.
 */
export const sortByPropertyName = (a: Property, b: Property) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};
