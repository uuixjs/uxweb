import {
  CSSObject,
  FOCUS_VISIBLE_ATTR,
  StyledComponent,
  a11yHide,
  css,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { InputSize } from "./form";

export const getInputSizeValue = styleVariant<{ size: InputSize }, "size">(
  "size",
  {
    [InputSize.Small]: staticTokenRule("input-size-small"),
    [InputSize.Default]: staticTokenRule("input-size-default"),
    [InputSize.Large]: staticTokenRule("input-size-large"),
  },
);

/**
 * Defines a basic :focus style for nodes which would not ordinarily receive
 * a browser default focus style. This works even in browers which do not
 * have support for enhanced "focus-visible" styles.
 *
 * Use for elements which do not already receive a native browser focus style.
 *
 * Example use case: A styled checkbox where the underlying <input> node which receives
 * the focus state is hidden by CSS and a sibling node is styled to look like a checkbox.
 * Thus the focus styles need to be applied on the sibling node instead of the <input>.
 */
export function focusRingStyleReplacement(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: StyledComponent<any, any>,
): CSSObject {
  return {
    // Emulate browser default focus ring:
    [`${target}:focus + &&`]: {
      outlineWidth: "5px",
      outlineStyle: "solid",
      outlineColor: "Highlight",
      "@media (-webkit-min-device-pixel-ratio: 0)": {
        outlineStyle: "auto",
        outlineColor: "-webkit-focus-ring-color",
      },
    },
    // Hide focus ring during pointer interactions:
    [`.js-focus-visible ${target}:focus:not(${FOCUS_VISIBLE_ATTR}) + &&`]: {
      outline: "none",
    },
  };
}

interface ScInputBaseProps {
  overlay?: boolean;
  error?: boolean;
}

export const ScInputBase = styled.input<ScInputBaseProps>`
  font-family: ${({ type }) =>
    /** "Temporary" fix for issues with Roobert rendering small dots in password inputs */
    type === "password" ? "sans-serif" : "inherit"};
  appearance: none;
  background-clip: padding-box;
  line-height: 1.5;

  transition: border ${staticTokenRule("timing-short")} ease-in,
    background-color ${staticTokenRule("timing-short")} ease-in;

  border-style: solid;
  border-width: ${staticTokenRule("border-width-input")};
  border-color: ${themeTokenRule("color-border-input")};
  color: ${themeTokenRule("color-text-input")};
  background-color: ${themeTokenRule("color-background-input")};

  &::placeholder {
    color: ${themeTokenRule("color-text-input-placeholder")};
  }

  &:hover {
    outline: none;
    border-color: ${themeTokenRule("color-border-input-hover")};
    background-color: ${themeTokenRule("color-background-input")};
  }

  /** Use :focus instead of focus-visible for the fallback UX in browsers without focus-visible */
  &:focus,
  &:focus:hover {
    outline: none;
    border-color: ${themeTokenRule("color-border-input-focus")};
    background-color: ${themeTokenRule("color-background-input-focus")};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &::-ms-clear {
    display: none;
  }

  &:-moz-focus-inner {
    padding: 0;
    border: none;
  }

  /** Overlay style overrides */
  ${({ overlay, error }) =>
    overlay && error
      ? css`
          color: ${themeTokenRule("color-text-overlay")};
          border-color: ${themeTokenRule("color-border-overlay-error")};
          background-color: ${themeTokenRule("color-background-input-overlay")};

          &::placeholder {
            color: ${themeTokenRule("color-text-input-placeholder-overlay")};
          }

          &:hover {
            border-color: ${themeTokenRule("color-border-overlay-error")};
          }

          &:focus,
          &:focus:hover {
            background-color: ${themeTokenRule(
              "color-background-input-overlay-focus",
            )};
            border-color: ${themeTokenRule("color-border-overlay-error")};
          }
        `
      : overlay
      ? css`
          color: ${themeTokenRule("color-text-overlay")};
          border-color: ${themeTokenRule("color-border-input-overlay")};
          background-color: ${themeTokenRule("color-background-input-overlay")};

          &::placeholder {
            color: ${themeTokenRule("color-text-input-placeholder-overlay")};
          }

          &:hover {
            border-color: ${themeTokenRule("color-border-input-overlay-hover")};
            background-color: ${themeTokenRule(
              "color-background-input-overlay",
            )};
          }

          &:focus,
          &:focus:hover {
            border-color: ${themeTokenRule("color-border-input-overlay-focus")};
            background-color: ${themeTokenRule(
              "color-background-input-overlay-focus",
            )};
          }
        `
      : error &&
        css`
          border-color: ${themeTokenRule("color-border-input-error")};

          &:hover {
            border-color: ${themeTokenRule("color-border-input-error")};
          }

          &:focus,
          &:focus:hover {
            border-color: ${themeTokenRule("color-border-input-error")};
          }
        `}
`;

interface ScCheckBoxInputBaseProps {
  overlay?: boolean;
}

export const ScCheckBoxInputBase = styled.input<ScCheckBoxInputBaseProps>`
  ${a11yHide}
  color: ${themeTokenRule("color-text-label")};
`;

interface ScCheckBoxLabelBaseProps {
  overlay?: boolean;
  error?: boolean;
}

export const ScCheckBoxLabelBase = styled.label<ScCheckBoxLabelBaseProps>`
  border-radius: ${staticTokenRule("border-radius-medium")};
  display: block;
  position: relative;
  padding: 0 0 0 1.6rem;
  cursor: pointer;
  color: ${themeTokenRule("color-text-label")};

  &::before {
    border-style: solid;
    border-width: ${staticTokenRule("border-width-input")};
    border-color: ${themeTokenRule("color-border-input-checkbox")};
    position: absolute;
    top: 50%;
    left: 0;
    width: 1.6rem;
    height: 1.6rem;
    margin-top: -0.8rem;
    box-sizing: border-box;
    background-clip: padding-box;
    content: "";
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 0.4rem;
    width: 0.8rem;
    height: 0.8rem;
    transform: translate3d(0, -50%, 0);
  }

  &:hover {
    &::before {
      border-color: ${themeTokenRule("color-border-input-checkbox-hover")};
    }
  }

  ${/* sc-selector */ ScCheckBoxInputBase}:checked + && {
    &::before {
      background-color: ${themeTokenRule(
        "color-background-input-checkbox-checked-background",
      )};
      border-color: ${themeTokenRule("color-border-input-checkbox-checked")};
    }
    &::after {
      background-color: ${themeTokenRule(
        "color-background-input-checkbox-checked",
      )};
    }
  }

  ${/* sc-selector */ ScCheckBoxInputBase}:disabled + && {
    opacity: 0.5;
    pointer-events: none;
  }

  ${focusRingStyleReplacement(ScCheckBoxInputBase)}

  /** Overlay and error style overrides */
  ${({ overlay, error }) =>
    overlay
      ? css`
          ${error
            ? css`
                color: ${themeTokenRule("color-text-overlay")};
                &::before {
                  background-color: ${themeTokenRule(
                    "color-background-input-overlay",
                  )};
                }

                &::before,
                &:hover::before {
                  border-color: ${themeTokenRule("color-border-overlay-error")};
                }
              `
            : css`
                color: ${themeTokenRule("color-text-overlay")};

                &::before {
                  border-color: ${themeTokenRule(
                    "color-border-input-checkbox-overlay",
                  )};
                  background-color: ${themeTokenRule(
                    "color-background-input-overlay",
                  )};
                }

                &:hover::before {
                  border-color: ${themeTokenRule(
                    "color-border-input-checkbox-hover-overlay",
                  )};
                }
              `}

          ${ScCheckBoxInputBase}:checked + && {
            &::before {
              background-color: ${themeTokenRule(
                "color-background-input-checkbox-checked-background-overlay",
              )};
              border-color: ${themeTokenRule(
                "color-border-input-checkbox-checked-overlay",
              )};
            }

            &::after {
              background-color: ${themeTokenRule(
                "color-background-input-checkbox-checked-overlay",
              )};
            }
          }
        `
      : error &&
        css`
          &::before,
          &:hover::before {
            border-color: ${themeTokenRule(
              "color-border-input-checkbox-error",
            )};
          }
        `}
`;
