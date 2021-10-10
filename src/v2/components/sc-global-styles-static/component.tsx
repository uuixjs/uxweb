import { createGlobalStyle, focusVisibleReset } from "lib/ui-utils";

/* stylelint-disable */

/**
 * Global Core UI CSS which does NOT
 * depend on theme context, such as:
 *
 *   - CSS reset
 *   - global style opinion with no css vars
 *
 * This can be rendered outside of a theme context provider
 * which will offer improved performance; s-c will
 * remove and re-add global styles when the theme context
 * value changes; we should minimize global css which
 * depends on theme context.
 */
export const ScGlobalStylesStatic = createGlobalStyle`
 /**
   * CSS RESET
   */
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    text-align: inherit;
  }

  /**
  * Core UI global styles
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* Sets base rem unit to 10px */
    text-size-adjust: 100%;
  }

  img {
    border: none;
    vertical-align: top;
    max-width: 100%;
  }

  li {
    list-style-position: inside;
  }

  em {
    font-style: italic;
  }

  button {
    border: none;
    background: none;
    border-radius: 0;
    color: inherit;
    font: inherit;

    &:hover {
      cursor: pointer;
    }

    &::-moz-focus-inner {
      padding: 0;
      border: 0;
    }
  }

  input {
    &[type="text"]::-ms-clear {
      display: none;
    }
  }

  hr {
    border: none;
  }

  * {
    ${focusVisibleReset`
    outline: none;
    `}
  }
`;
