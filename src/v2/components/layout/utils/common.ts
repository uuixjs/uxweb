import { ThemeContextValue, ThemedStyledProps } from "lib";

import { StandardPropertiesHyphen } from "csstype";

export type PropClassNameMap<T> = {
  [P in keyof T]: (
    props: ThemedStyledProps<Partial<T>, ThemeContextValue>,
    value: T[P],
  ) => string | void | null;
};

export function getLayoutStyles<T extends {}>(
  props: ThemedStyledProps<T, ThemeContextValue>,
  map: PropClassNameMap<Required<T>>,
) {
  let allCss = "";

  /**
   * !!! This function gets called A LOT and must be efficient !!!
   *
   * The strategy to keep this function running fast is to iterate over the
   * list of provided props so that short lists of props run more quickly.
   *
   * In general, prefer moving logic to individual functions which handle
   * each property instead of doing the work on every single component render.
   */

  for (const propName in props as T) {
    if (propName in map) {
      const propValue = props[propName];
      if (propValue === undefined) {
        continue;
      }

      const result = map[propName](props, propValue);

      if (result) {
        allCss += result;
      }
    }
  }

  return allCss;
}

/**
 * Util to directly use provided prop values as CSS values.
 */
export function toCssProp<P extends {}>(
  cssProp: keyof StandardPropertiesHyphen,
) {
  return (_props: P, propValue: unknown) => {
    if (propValue !== undefined) {
      return `${cssProp}: ${propValue} !important;`;
    }
  };
}

/**
 * Util to conditinoally return a provided CSS string.
 */
export function conditionalStyles<P extends {}>(cssValue: string) {
  return (_props: P, propValue: unknown) => {
    if (propValue) {
      return cssValue;
    }
  };
}
