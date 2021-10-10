import {
  Interpolation,
  InterpolationFunction,
  ThemeProps,
} from "styled-components";
import { ThemeContextValue } from "../../themed-styled-components";

type InterpolationFn<P> = InterpolationFunction<
  P & ThemeProps<ThemeContextValue>
>;

type StyleValues<P> = Interpolation<P & ThemeProps<ThemeContextValue>>;

/**
 * Generates a styled-components compatible interpolation function which
 * will use a different value based on the specified component property
 *
 * Usage Example:
 *
 * background-color: ${styleVariant<ButtonProps, "type">("type", {
 *   "primary": themeTokenRule("color-button-primary")
 *   "secondary": themeTokenRule("color-button-secondary")
 * })}
 *
 * Examples of supported values:
 *
 *   themeTokeRule("color-button-primary")
 *   themeRule({ light: "#FFF", dark: "#000" })
 *   (props) => props.theme.mode === "light" ? "#FFF" : "#000"
 *   (props) => props.children ? "1rem" : "0rem"
 *   "#FFF"
 *
 * @param propName
 * @param values
 */
export function styleVariant<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends { [key: string]: any },
  N extends keyof P
>(
  propName: N,
  values: {
    [key in P[N]]: StyleValues<P>;
  },
): InterpolationFn<P> {
  return (props) => {
    const variantValue: StyleValues<P> =
      props[propName] && values[props[propName]];

    if (typeof variantValue === "function") {
      return variantValue(props);
    }

    // handle pass through types such as "string" or "number"
    return variantValue;
  };
}
