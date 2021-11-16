import { Display, Layout, Position, ZIndex } from "../../layout";
import {
  FormEventHandler,
  ForwardRefRenderFunction,
  Ref,
  forwardRef,
} from "react";
import {
  css,
  focusVisible,
  getAriaProps,
  getDataProps,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib";

import { StaticTokenMap } from "lib/ui-tokens";
import { withOverlayContext } from "../../overlay-region/context";

export interface RangePropsBase {
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  onBlur?: FormEventHandler<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLInputElement>;
  onFocus?: FormEventHandler<HTMLInputElement>;
  max?: number;
  min?: number;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLInputElement>;
  step?: number;
  tabIndex?: number;
  overlay?: boolean;
}

export interface RangePropsUnfilled extends RangePropsBase {
  defaultValue?: string;
  value?: string;
}

export interface RangePropsFilled extends RangePropsBase {
  fill: boolean;
  max: number;
  min: number;
  value: string;
}

export type RangeProps = RangePropsUnfilled | RangePropsFilled;

function isRangeFilled(props: RangeProps): props is RangePropsFilled {
  const filled = props as RangePropsFilled;
  return (
    filled.fill !== undefined &&
    filled.max !== undefined &&
    filled.min !== undefined &&
    filled.value !== undefined
  );
}

const trackHeight = "0.2rem";
const thumbHeight = "1.6rem";
const thumbWidth = "1.6rem";
const thumbMargin = "-0.7rem"; // "$track-height / 2 - $thumb-height / 2";

interface ScRangeProps {
  $overlay: boolean;
  $error: boolean;
  $filled: boolean;
}

const rangeSliderCss = css<ScRangeProps>`
  width: 100%;
  height: ${trackHeight};
  cursor: pointer;

  border-radius: ${staticTokenRule("border-radius-large")};

  background-color: ${({ $filled, $overlay }) =>
    $filled
      ? undefined
      : $overlay
      ? themeTokenRule("color-background-range-overlay")
      : themeTokenRule("color-background-range")};
`;

const rangeThumbCss = css<ScRangeProps>`
  border-radius: ${staticTokenRule("border-radius-rounded")};
  box-shadow: ${themeTokenRule("shadow-elevation-1")};
  width: ${thumbWidth};
  height: ${thumbHeight};
  margin-top: ${thumbMargin};
  border: ${staticTokenRule("border-width-default")} solid
    ${({ $overlay, $error }) =>
      $error && $overlay
        ? themeTokenRule("color-border-overlay-error")
        : $error
        ? themeTokenRule("color-border-input-error")
        : $overlay
        ? themeTokenRule("color-background-range-overlay-fill")
        : themeTokenRule("color-border-range-handle")};
  background-color: ${({ $overlay, $error }) =>
    $error && $overlay
      ? themeTokenRule("color-border-overlay-error")
      : $error
      ? themeTokenRule("color-border-input-error")
      : $overlay
      ? themeTokenRule("color-background-range-overlay-fill")
      : themeTokenRule("color-background-range-fill")};
  appearance: none;
`;

const rangeThumbFocusCss = css`
  border: ${staticTokenRule("border-width-input")} solid
    ${themeTokenRule("color-border-range-handle-focus")};
`;
const ScRangeInput = styled.input<ScRangeProps>`
  width: 100%;
  height: ${thumbHeight};
  vertical-align: middle;
  appearance: none;

  /** Intended to be applied to the full "clickable" area that can be dragged by the mouse */
  cursor: pointer;

  &,
  &:hover,
  &:focus,
  &:active {
    border: none;
    background: transparent;
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  /**
   * Slider
   */
  &::-moz-range-track {
    ${rangeSliderCss}
  }

  &::-ms-track {
    ${rangeSliderCss}

    /** MS Edge fails horribly when we try to use css vars on range psuedo elements. Avoid using any CSS vars on these!  */
    border-radius: ${StaticTokenMap["border-radius-large"]};
    background: ${StaticTokenMap["color-opac-b-4"]};
  }

  &::-webkit-slider-runnable-track {
    ${rangeSliderCss}
  }

  &::-ms-fill-lower {
    background-color: ${themeTokenRule("color-background-range")};
    ${rangeSliderCss}
  }

  &::-ms-fill-upper {
    background-color: ${themeTokenRule("color-background-range")};
    ${rangeSliderCss}
  }

  /**
   * Thumb
   */
  &::-moz-range-thumb {
    ${rangeThumbCss}
  }

  &::-ms-thumb {
    /** MS Edge fails horribly when we try to use css vars on range psuedo elements. Avoid using any CSS vars on these!  */
    border-radius: 50%;
    box-shadow: ${StaticTokenMap["color-opac-b-4"]} 0 0 0 1px inset;
    width: ${thumbWidth};
    height: ${thumbHeight};
    margin-top: ${thumbMargin};
    border: ${({ $overlay, $error }) =>
      $error ? "1px solid red" : $overlay ? "1px solid white" : "none"};
    background: ${({ $overlay }) =>
      $overlay ? "white" : StaticTokenMap["color-twitch-purple-9"]};
    appearance: none;
  }

  &::-webkit-slider-thumb {
    ${rangeThumbCss}
  }

  ${focusVisible`
    outline: none;

    &::-moz-range-thumb {
      ${rangeThumbFocusCss}
    }

    &::-ms-thumb {
      ${rangeThumbFocusCss}
    }

    &::-webkit-slider-thumb {
      ${rangeThumbFocusCss}
    }
  `}
`;

const ScRangeFill = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: ${staticTokenRule("z-index-below")};
  border-radius: ${staticTokenRule("border-radius-large")};

  ${ScRangeInput}:disabled + && {
    opacity: 0.5;
  }
`;

const ScRangeFillContainer = styled.div<{ $overlay: boolean }>`
  border-radius: ${staticTokenRule("border-radius-large")};
  background-color: ${({ $overlay }) =>
    $overlay
      ? themeTokenRule("color-background-range-overlay")
      : themeTokenRule("color-background-range")};
  width: 100%;
  height: ${trackHeight};
  cursor: pointer;
`;

const ScRangeFillValue = styled.div<{ $overlay: boolean; $error?: boolean }>`
  border-radius: ${staticTokenRule("border-radius-large")};
  background-color: ${({ $overlay, $error }) =>
    $error && $overlay
      ? themeTokenRule("color-border-overlay-error")
      : $error
      ? themeTokenRule("color-border-input-error")
      : $overlay
      ? themeTokenRule("color-background-range-overlay-fill")
      : themeTokenRule("color-background-range-fill")};
  height: 100%;
`;

export const RangeComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  RangeProps
> = (props, ref) => {
  const input = (
    <ScRangeInput
      $overlay={!!props.overlay}
      $error={!!props.error}
      $filled={isRangeFilled(props)}
      {...getAriaProps(props)}
      ref={ref || props.refDelegate}
      className={"tw-range"}
      id={props.id}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      tabIndex={props.tabIndex}
      defaultValue={isRangeFilled(props) ? undefined : props.defaultValue}
      disabled={props.disabled}
      type="range"
      min={props.min}
      max={props.max}
      name={props.name}
      step={props.step}
      value={props.value}
      {...getDataProps(props)}
    />
  );

  if (isRangeFilled(props)) {
    // Calculate the percentage filled based on the min, max, and current value
    const fillPercentage =
      ((parseFloat(props.value) - props.min) / (props.max - props.min)) * 100;
    return (
      <Layout
        position={Position.Relative}
        zIndex={ZIndex.Above}
        fullWidth
        display={Display.Flex} // Necessary to cause the input to render as display: block (otherwise it has the wrong height)
      >
        {input}
        <ScRangeFill>
          <ScRangeFillContainer $overlay={!!props.overlay}>
            <ScRangeFillValue
              $overlay={!!props.overlay}
              $error={props.error}
              style={{ width: `${fillPercentage.toFixed(2)}%` }}
              data-test-selector="tw-range__fill-value-selector"
            />
          </ScRangeFillContainer>
        </ScRangeFill>
      </Layout>
    );
  }

  return input;
};

RangeComponent.displayName = "Range";
const ComponentWithRef = forwardRef(RangeComponent);
const ComponentWithOverlayContext = withOverlayContext<
  RangeProps,
  HTMLInputElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as Range };
