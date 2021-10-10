import {
  css,
  Interpolation,
  InterpolationFunction,
  ThemedStyledProps,
  ThemeProps,
} from "styled-components";
import { ThemeContextValue } from "../../themed-styled-components";

type InterpolationFn<P> = InterpolationFunction<
  ThemedStyledProps<P, ThemeContextValue>
>;

type InterpolationArray<P> = Interpolation<
  ThemedStyledProps<P, ThemeContextValue>
>[];

/**
 * Uses ThemeContextValue to decide whether or not to render hover styles.
 */
export function hoverCss<P extends {}>(
  strings: TemplateStringsArray,
  ...interpolations: InterpolationArray<P>
): InterpolationFn<P> {
  return ({ theme }: ThemeProps<ThemeContextValue>) => {
    if (theme.disableHoverCSS) {
      return undefined;
    }

    return css`
      &:hover {
        ${css(strings, ...interpolations)}
      }
    `;
  };
}

/**
 * Uses ThemeContextValue to decide whether or not to render hover styles.
 *
 * @param selector The CSS hover selector
 */
export function hoverCssWithSelector<N>(selector: string) {
  function privateHoverCss<P extends {} = N>(
    strings: TemplateStringsArray,
    ...interpolations: InterpolationArray<P>
  ): InterpolationFn<P> {
    return ({ theme }: ThemeProps<ThemeContextValue>) => {
      if (theme.disableHoverCSS) {
        return undefined;
      }

      const innerStyles = css(strings, ...interpolations);

      return css`
        ${selector} {
          ${innerStyles}
        }
      `;
    };
  }

  return privateHoverCss;
}
