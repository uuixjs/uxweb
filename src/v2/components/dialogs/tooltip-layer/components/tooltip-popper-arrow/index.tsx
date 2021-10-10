import { staticTokenRule, styled, themeTokenRule } from "lib/ui-utils";

export const TooltipPopperArrow = styled.div.attrs({
  className: "tw-tooltip-popper-arrow",
})`
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  z-index: ${staticTokenRule(
    "z-index-below",
  )}; /* Keeps the arrow behind the tooltip body */

  &::after {
    content: " ";
    position: absolute;
    transform: rotate(45deg);
    width: 6px;
    height: 6px;
    background-color: ${themeTokenRule("color-background-tooltip")};
    box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  }

  /* TOP */
  [data-popper-placement^="top"] & {
    bottom: -3px;
  }

  [data-popper-placement^="top"] &::after {
    border-radius: 0 0 ${staticTokenRule("border-radius-small")} 0;
  }

  /* BOTTOM */
  [data-popper-placement^="bottom"] & {
    top: -3px;
  }

  [data-popper-placement^="bottom"] &::after {
    border-radius: ${staticTokenRule("border-radius-small")} 0 0 0;
  }

  /* LEFT */
  [data-popper-placement^="left"] & {
    right: -3px;
  }

  [data-popper-placement^="left"] &::after {
    border-radius: 0 ${staticTokenRule("border-radius-small")} 0 0;
  }

  /* RIGHT */
  [data-popper-placement^="right"] & {
    left: -3px;
  }

  [data-popper-placement^="right"] &::after {
    border-radius: 0 0 0 ${staticTokenRule("border-radius-small")};
  }
`;
