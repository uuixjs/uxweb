/*
 * Returns true if the browser supports CSS Custom Properties.
 *
 * @see https://caniuse.com/#feat=css-variables
 * @see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/customproperties.js
 */
export function supportsCssVars() {
  if (typeof window === "undefined") {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  const supportsFn = (w.CSS && w.CSS.supports.bind(w.CSS)) || w.supportsCSS;
  return !!(supportsFn && (supportsFn("--f:0") || supportsFn("--f", 0)));
}

/**
 * Temporary alias to support legacy behavior.
 *
 * In the future, theming will work regardless of CSS variable support.
 * However, while we are still converting from scss to styled-componets
 * this check is still necessary since un-converted compononents will
 * still require CSS variable support to work with theming.
 *
 * @deprecated This function has been re-named to `supportsCssVars()`
 */
export const supportsThemes = supportsCssVars;

// Returns true if the browser prefers dark color scheme
// @see https://caniuse.com/#search=prefers-color-scheme
export function prefersDarkMode() {
  if (typeof window === "undefined") {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return !!(
    w.matchMedia && w.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Returns true if the user prefers reduced motion
 * Returns false if no preference is set, or if browser does not support this feature.
 *
 * @see https://caniuse.com/#feat=prefers-reduced-motion
 */
export const prefersReducedMotion = (() => {
  let memoizedValue: boolean | undefined = undefined;

  return () => {
    if (memoizedValue !== undefined) {
      return memoizedValue;
    }

    if (typeof window === "undefined") {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    memoizedValue = !!(
      w.matchMedia && w.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    return memoizedValue;
  };
})();
