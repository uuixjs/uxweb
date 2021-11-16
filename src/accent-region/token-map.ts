import { CSSObject, ThemeContextValue, ThemeToken } from "@uuixjs/uuixweb-lib";

// Static tokens, only available within Accent Regions
export enum AccentToken {
  Primary1 = "color-accent-primary-1",
  Primary2 = "color-accent-primary-2",
  Primary3 = "color-accent-primary-3",
  Primary4 = "color-accent-primary-4",
  Primary5 = "color-accent-primary-5",
  Accent = "color-accent",
  AccentLabel = "color-accent-label",
  Hover = "color-accent-hover",
  BackgroundButtonPurchase = "color-background-button-purchase",
}

export type AccentTokenValues = { [key in AccentToken]?: string };
export type AccentTokenMap = Readonly<{ [key in ThemeToken]?: AccentToken }>;

export const accentTokenDarkThemeMap: AccentTokenMap = {
  /* Backgrounds */
  "color-background-accent": AccentToken.Primary3,
  "color-background-accent-alt": AccentToken.Primary2,
  "color-background-accent-alt-2": AccentToken.Primary1,

  /* Text */
  "color-text-button": AccentToken.AccentLabel,
  "color-text-button-primary": AccentToken.AccentLabel,

  /* Links */
  "color-text-link": AccentToken.Primary5,
  "color-text-link-active": AccentToken.Primary4,
  "color-text-link-focus": AccentToken.Primary4,
  "color-text-link-hover": AccentToken.Primary4,
  "color-text-link-visited": AccentToken.Primary5,

  /* Interactable */
  "color-background-interactable-hover": AccentToken.Primary3,
  "color-background-interactable-active": AccentToken.Primary2,

  /* Buttons */
  "color-background-button-primary-default": AccentToken.Accent,
  "color-background-button-primary-hover": AccentToken.Hover,
  "color-background-button-primary-active": AccentToken.Accent,
  "color-text-button-text": AccentToken.Primary5,
  "color-text-button-text-active": AccentToken.Primary4,
  "color-text-button-text-focus": AccentToken.Primary4,
  "color-text-button-text-hover": AccentToken.Primary4,

  /* Button Icons */
  "color-fill-button-icon": AccentToken.Primary5,
  "color-fill-button-icon-hover": AccentToken.Primary5,
  "color-fill-button-icon-focus": AccentToken.Primary5,
  "color-fill-button-icon-active": AccentToken.Primary5,

  /* Input */
  "color-border-input-focus": AccentToken.Primary4,

  /* Checkbox */
  "color-background-input-checked": AccentToken.Primary4,
  "color-background-input-checkbox-checked": AccentToken.Primary4,
  "color-border-input-checkbox-checked": AccentToken.Primary4,
  "color-border-input-checkbox-focus": AccentToken.Primary4,

  /* Toggle */
  "color-background-toggle-handle-checked": AccentToken.Primary4,
  "color-border-toggle-focus": AccentToken.Primary4,
  "color-border-toggle-checked": AccentToken.Primary4,
  "color-text-toggle-checked-icon": AccentToken.Primary4,

  /* Range */
  "color-background-range-fill": AccentToken.Primary4,

  /* Progress */
  "color-background-progress-status": AccentToken.Primary4,
};

export const accentTokenLightThemeMap: AccentTokenMap = {
  /* Backgrounds */
  "color-background-accent": AccentToken.Primary3,
  "color-background-accent-alt": AccentToken.Primary2,
  "color-background-accent-alt-2": AccentToken.Primary1,

  /* Text */
  "color-text-button": AccentToken.AccentLabel,
  "color-text-button-primary": AccentToken.AccentLabel,

  /* Links */
  "color-text-link": AccentToken.Primary2,
  "color-text-link-active": AccentToken.Primary1,
  "color-text-link-focus": AccentToken.Primary1,
  "color-text-link-hover": AccentToken.Primary1,
  "color-text-link-visited": AccentToken.Primary2,

  /* Interactable */
  "color-background-interactable-hover": AccentToken.Primary3,
  "color-background-interactable-active": AccentToken.Primary2,

  /* Buttons */
  "color-background-button-primary-default": AccentToken.Accent,
  "color-background-button-primary-hover": AccentToken.Hover,
  "color-background-button-primary-active": AccentToken.Accent,
  "color-text-button-text": AccentToken.Primary2,
  "color-text-button-text-active": AccentToken.Primary1,
  "color-text-button-text-focus": AccentToken.Primary1,
  "color-text-button-text-hover": AccentToken.Primary1,

  /* Button Icons */
  "color-fill-button-icon": AccentToken.Primary1,
  "color-fill-button-icon-hover": AccentToken.Primary1,
  "color-fill-button-icon-focus": AccentToken.Primary1,
  "color-fill-button-icon-active": AccentToken.Primary1,

  /* Input */
  "color-border-input-focus": AccentToken.Primary3,

  /* Checkbox */
  "color-background-input-checked": AccentToken.Primary2,
  "color-background-input-checkbox-checked": AccentToken.Primary2,
  "color-border-input-checkbox-checked": AccentToken.Primary2,
  "color-border-input-checkbox-focus": AccentToken.Primary2,

  /* Toggle */
  "color-background-toggle-handle-checked": AccentToken.Primary2,
  "color-border-toggle-focus": AccentToken.Primary2,
  "color-border-toggle-checked": AccentToken.Primary2,
  "color-text-toggle-checked-icon": AccentToken.Primary2,

  /* Range */
  "color-background-range-fill": AccentToken.Primary2,

  /* Progress */
  "color-background-progress-status": AccentToken.Primary2,
};

/**
 * Creates CSS vars to define accent token values
 */
export function formatAccentTokenCssVars(values: AccentTokenValues): CSSObject {
  const cssObj: CSSObject = {};

  Object.entries(values).forEach(([accentToken, value]) => {
    cssObj[`--${accentToken}`] = value;
  });

  return cssObj;
}

/**
 * Takes accent values and a theme map and assigns values to theme tokens.
 */
export function formatTokenOverrides(
  values: AccentTokenValues,
  map: AccentTokenMap,
): ThemeContextValue["tokenOverrides"] {
  const tokenOverrides: ThemeContextValue["tokenOverrides"] = {};

  Object.entries(map).forEach(([themeToken, accentToken]) => {
    if (themeToken && accentToken && values[accentToken]) {
      tokenOverrides[themeToken as ThemeToken] = values[accentToken];
    }
  });

  return tokenOverrides;
}
