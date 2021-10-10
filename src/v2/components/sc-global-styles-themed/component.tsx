import {
  createGlobalStyle,
  staticTokenRule,
  themeTokenRule,
} from "lib";

/* stylelint-disable */

/**
 * Global Core UI CSS which DOES
 * depend on theme context, such as:
 *
 *   - colors
 *   - static tokens which might render as css vars
 *
 * This must be rendered inside of a theme context provider
 * and all of this css will be removed and re-added whenever
 * any theme context value changes. This has an impact on
 * performance; minimize these styles!
 */
export const ScGlobalStylesThemed = createGlobalStyle`

  /**
  * Core UI global styles
  */
  body {
    background-color: ${themeTokenRule("color-background-body")};
    color: ${themeTokenRule("color-text-base")};
    font-family: ${staticTokenRule("font-base")};
    font-size: ${staticTokenRule("font-size-base")};
    line-height: 2rem;
  }

  a {
    color: ${themeTokenRule("color-text-link")};
    text-decoration: none;

    /**
    * This hover selector is NOT wrapped in @include feature-detect("hover")
    * because doing so increases the selector specificty enough that it
    * overwrites CSS in buttons which render as <a> tags.
    *
    * TODO: Find a way to eliminate the CSS selector specificty conflict which occurs
    * due to @include feature-detect("hover") increasing selector specificity.
    */
    &:hover {
      color: ${themeTokenRule("color-text-link-hover")};
      text-decoration: underline;
    }
  }

  h1,
  h2 {
    font-weight: ${staticTokenRule("font-weight-bold")};
  }
  h3,
  h4 {
    font-weight: ${staticTokenRule("font-weight-semibold")};
  }

  strong {
    font-weight: ${staticTokenRule("font-weight-bold")};
  }

  ::selection {
    background-color: ${themeTokenRule("color-background-accent")};
    color: ${themeTokenRule("color-text-overlay")};
  }

  /**
  * Typography
  */
  html,
  body {
    line-height: ${staticTokenRule("line-height-body")};
  }

  h1 {
    font-size: ${staticTokenRule("font-size-1")};
    line-height: ${staticTokenRule("line-height-heading")};
  }

  h2 {
    font-size: ${staticTokenRule("font-size-2")};
    line-height: ${staticTokenRule("line-height-heading")};
  }

  h3 {
    font-size: ${staticTokenRule("font-size-3")};
    line-height: ${staticTokenRule("line-height-heading")};
  }

  h4 {
    font-size: ${staticTokenRule("font-size-4")};
    line-height: ${staticTokenRule("line-height-body")};
  }

  h5 {
    font-size: ${staticTokenRule("font-size-5")};
    line-height: ${staticTokenRule("line-height-body")};
  }

  h6 {
    font-size: ${staticTokenRule("font-size-6")};
    line-height: ${staticTokenRule("line-height-body")};
  }

  p {
    font-size: ${staticTokenRule("font-size-6")};
    line-height: ${staticTokenRule("line-height-body")};
  }
`;

ScGlobalStylesThemed.displayName = "ScGlobalStyles";
