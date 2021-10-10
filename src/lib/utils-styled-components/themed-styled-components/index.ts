// eslint-disable-next-line no-restricted-imports
import * as sc from "styled-components";

import { ThemeContextValue } from "./theme-context";

/**
 * 1.
 *
 * Re-exports from the styled-components module
 * with ThemeContextValue added to the type definitions
 */
type ScTypes = sc.ThemedStyledComponentsModule<ThemeContextValue>;

export const styled: ScTypes["default"] = sc.default;
export const css = sc.css as ScTypes["css"];
export const keyframes = sc.keyframes as ScTypes["keyframes"];
export const createGlobalStyle = sc.createGlobalStyle as ScTypes["createGlobalStyle"];

// Do not directly export the actual react context object, provider, or consumer because there is no way to set the default value

/**
 * 2.
 *
 * Utils which have implementations in this package which modify the
 * behavior of the component before wrapping the s-c versions
 */
export { ThemeProvider, ThemeProviderProps } from "./theme-provider";
export { useTheme, ThemeContextValue } from "./theme-context";

/**
 * Exports from styled-components that should not be used directly.
 */
export const ThemeConsumer = undefined;
export const ThemeContext = undefined;
export const withTheme = undefined;

/**
 * 3.
 *
 * Re-export everything else that is un-modified.
 *
 */
// eslint-disable-next-line no-restricted-imports
export * from "styled-components";
