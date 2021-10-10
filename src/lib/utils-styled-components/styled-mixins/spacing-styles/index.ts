import { CSSObject } from "styled-components";
import { directionalProperty } from "polished";

export type PaddingValue = 0 | 0.5 | 1 | 2 | 3 | 4 | 5;
export type MarginValue = 0 | 0.5 | 1 | 2 | 3 | 4 | 5 | "auto";

export type PaddingValues = {
  top?: PaddingValue;
  right?: PaddingValue;
  bottom?: PaddingValue;
  left?: PaddingValue;
  x?: PaddingValue;
  y?: PaddingValue;
};

export type MarginValues = {
  top?: MarginValue;
  right?: MarginValue;
  bottom?: MarginValue;
  left?: MarginValue;
  x?: MarginValue;
  y?: MarginValue;
};

export type Padding = PaddingValue | PaddingValues;
export type Margin = MarginValue | MarginValues;

type SpacingType = "padding" | "margin";

function getSpacingValue(
  value: PaddingValue | MarginValue | undefined,
): string | null {
  if (value === undefined) {
    // return null to have value omitted from final output
    return null;
  }

  if (value === "auto") {
    return value;
  }

  if (value === 0) {
    return "0";
  }

  return `${value}rem;`;
}

function getSpacingStyles(
  value: Padding | Margin,
  type: SpacingType,
): CSSObject {
  if (typeof value === "object") {
    if (
      value.x !== undefined &&
      (value.left !== undefined || value.right !== undefined)
    ) {
      throw new Error("Cannot use `x` and `left` or `right` at the same time.");
    }

    if (
      value.y !== undefined &&
      (value.top !== undefined || value.bottom !== undefined)
    ) {
      throw new Error("Cannot use `y` and `top` or `bottom` at the same time.");
    }

    return directionalProperty(
      type,
      getSpacingValue(value.y ?? value.top),
      getSpacingValue(value.x ?? value.right),
      getSpacingValue(value.y ?? value.bottom),
      getSpacingValue(value.x ?? value.left),
    );
  }

  return directionalProperty(type, getSpacingValue(value));
}

export type PaddingProps = {
  padding?: Padding;
};

export function getPaddingStyles(opts: PaddingProps): CSSObject {
  if (opts.padding === undefined) {
    return {};
  }

  return getSpacingStyles(opts.padding, "padding");
}

export type MarginProps = {
  margin?: Margin;
};

export function getMarginStyles(opts: MarginProps): CSSObject {
  if (opts.margin === undefined) {
    return {};
  }

  return getSpacingStyles(opts.margin, "margin");
}
