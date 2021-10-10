import {
  css,
  Interpolation,
  InterpolationFunction,
  ThemedStyledProps,
} from "styled-components";
import { ThemeContextValue } from "../../themed-styled-components";

export const FOCUS_VISIBLE_ATTR = "[data-focus-visible-added]";

type InterpolationFn<P> = InterpolationFunction<
  ThemedStyledProps<P, ThemeContextValue>
>;

type InterpolationArray<P> = Interpolation<
  ThemedStyledProps<P, ThemeContextValue>
>[];

/**
 * Helper to apply styles when an element is focused via keyboard.
 *
 * See https://github.com/WICG/focus-visible
 *
 * When to just use CSS :focus
 *   1. The element should always display focus styles even during mouse interaction, such as text input fields according to W3C recomendation
 *   2. There is no native focus style and we need to provide a backwards compatible focus style
 *
 * When to use `focusVisible`
 *   1. Add enhancement in addition to the default :focus outline (i.e. background color, shadow, etc)
 */
export function focusVisible<P extends {}>(
  strings: TemplateStringsArray,
  ...interpolations: InterpolationArray<P>
): InterpolationFn<P> {
  const selector = `&${FOCUS_VISIBLE_ATTR}`;

  const innerStyles = css(strings, ...interpolations);

  return () => css`
    ${selector} {
      ${innerStyles}
    }
  `;
}

/**
 * Progressive enhancement to remove focus styles if :focus-visible is supported but is not matching.
 *
 * When to use `focusVisibleReset`
 *    1. Hide :focus styles during mouse/pointer interactions
 *
 * See https://developer.paciellogroup.com/blog/2018/03/focus-visible-and-backwards-compatibility/
 */
export function focusVisibleReset<P extends {}>(
  styles: TemplateStringsArray,
  ...interpolations: InterpolationArray<P>
): InterpolationFn<P> {
  const selector = `.js-focus-visible &:focus:not(${FOCUS_VISIBLE_ATTR})`;

  const innerStyles = css(styles, ...interpolations);

  return () => css`
    ${selector} {
      ${innerStyles}
    }
  `;
}
