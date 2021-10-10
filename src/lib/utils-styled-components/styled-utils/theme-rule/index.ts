import theme, { ThemeValue } from "styled-theming";
import { ThemeContextValue } from "../../themed-styled-components";

// Include keys whose member values are compatible as object keys
type ThemeContextKeys = keyof Pick<ThemeContextValue, "name">;

/**
 * Create a CSS value which changes based on current theme mode
 *
 * Examples usage:
 *
 *   background-color: ${themeRule({ light: "#FFF", dark: "#000" })}
 */
export function themeRule(
  values: Record<ThemeContextValue["name"], ThemeValue>,
): theme.ThemeSet;

export function themeRule<K extends ThemeContextKeys>(
  name: K,
  values: Record<ThemeContextValue[K], ThemeValue>,
): theme.ThemeSet;

export function themeRule<K extends ThemeContextKeys>(
  a: K | Record<ThemeContextValue[K], ThemeValue>,
  b?: Record<ThemeContextValue[K], ThemeValue>,
) {
  const name: string = b === undefined ? "name" : (a as K);
  const values = b ?? (a as theme.ThemeMap);

  return theme(name, values);
}
