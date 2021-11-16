import { DarkThemeMap, LightThemeMap } from "lib/ui-tokens";
import { Display, InjectLayout } from "../../layout";
import {
  FormEventHandler,
  ForwardRefRenderFunction,
  ReactNode,
  Ref,
  forwardRef,
} from "react";
import { INPUT_BORDER_RADIUS, INPUT_SIZES, InputSize } from "../form";
import {
  cn,
  css,
  getAriaProps,
  getDataProps,
  staticTokenRule,
  styleVariant,
  styled,
  themeRule,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { ScInputBase } from "../common";
import { withOverlayContext } from "../../overlay-region/context";

interface ScSelectProps {
  $size?: InputSize;
  overlay?: boolean;
}

const ScSelect = styled(ScInputBase)<ScSelectProps>`
  background-image: url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2020%2020%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Cpath%20fill%3D%22${encodedBgImageColor}%22%20d%3D%22M10.5%2013.683l2.85-2.442%201.3%201.518-3.337%202.86a1.25%201.25%200%200%201-1.626%200l-3.338-2.86%201.302-1.518%202.849%202.442zm0-7.366L7.65%208.76l-1.3-1.518%203.337-2.86a1.25%201.25%200%200%201%201.627%200l3.337%202.86-1.302%201.518L10.5%206.317z%22%20%2F%3E%0A%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: ${({ $size }) =>
    $size === InputSize.Large
      ? "2.4rem"
      : $size === InputSize.Small
      ? "1.6rem"
      : "2rem"};
  height: ${styleVariant("$size", {
    [InputSize.Small]: staticTokenRule("input-size-small"),
    [InputSize.Default]: staticTokenRule("input-size-default"),
    [InputSize.Large]: staticTokenRule("input-size-large"),
  })};
  cursor: pointer;
  line-height: normal;

  padding: ${({ $size }) =>
    $size === InputSize.Small ? "0.2rem 0" : undefined};

  /**
  * Sets styles on <Option> elements to ensure that some browsers in windows display proper native select menus.
  * See https://git.xarth.tv/core-ui/core-ui/pull/1449 for more context.
  */
  /* stylelint-disable-next-line selector-max-type */
  &:focus,
  &:focus option {
    border-color: ${themeTokenRule("color-border-input-focus")};
    background-color: ${themeTokenRule("color-background-input-focus")};
  }

  ${({ overlay }) =>
    overlay &&
    css`
      /**
       * Sets styles on <Option> elements to ensure that some browsers in windows display proper native select menus.
       * See https://git.xarth.tv/core-ui/core-ui/pull/1449 for more context.
       */
      &:focus,
      &:focus option {
        border-color: ${themeTokenRule("color-border-input-overlay-focus")};
        background-color: ${themeTokenRule(
          "color-background-input-overlay-focus",
        )};
      },
    `}
`;

export interface SelectProps {
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label"?: string;
  autoComplete?: string;
  children?: ReactNode;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
  onBlur?: FormEventHandler<HTMLSelectElement>;
  onChange?: FormEventHandler<HTMLSelectElement>;
  onFocus?: FormEventHandler<HTMLSelectElement>;
  overlay?: boolean;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLSelectElement>;
  required?: boolean;
  tabIndex?: number;
  size?: InputSize;
  value?: string;
}

export const SelectComponent: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = (props, ref) => {
  const classes: ClassValue = {
    "tw-select": true,
    "tw-select--small": props.size === InputSize.Small,
    "tw-select--large": props.size === InputSize.Large,
    "tw-select--disabled": props.disabled,
    "tw-select--error": props.error,
    "tw-select--overlay": props.overlay,
  };

  let inputSize = InputSize.Default;
  if (props.size) {
    inputSize = props.size;
  }

  return (
    <InjectLayout
      display={Display.Block}
      borderRadius={
        INPUT_BORDER_RADIUS[props.size ? props.size : InputSize.Default]
      }
      fontSize={INPUT_SIZES[inputSize]}
      padding={{
        left: 1,
        right: 3,
        y: props.size === InputSize.Small ? undefined : 0.5,
      }}
      fullWidth
    >
      <ScSelect
        as="select"
        $size={props.size}
        overlay={props.overlay}
        error={props.error}
        className={cn(classes)}
        defaultValue={props.defaultValue}
        autoComplete={props.autoComplete}
        disabled={props.disabled}
        id={props.id}
        name={props.name}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        required={props.required}
        tabIndex={props.tabIndex}
        value={props.value}
        ref={ref || props.refDelegate}
        {...getAriaProps(props)}
        {...getDataProps(props)}
      >
        {props.children}
      </ScSelect>
    </InjectLayout>
  );
};

SelectComponent.displayName = "Select";
const ComponentWithRef = forwardRef(SelectComponent);
const ComponentWithOverlayContext = withOverlayContext<
  SelectProps,
  HTMLSelectElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as Select };

/**
 * Returns a URI encoded hex code based on theme and overlay.
 */
function encodedBgImageColor(props: ScSelectProps) {
  /**
   * This is an unusual way to set theme colors.
   * It is done because we need a URL encoded hex code
   * value for use in the background-image data string.
   */
  const lightThemeColor = encodeURIComponent(LightThemeMap["color-text-input"]);
  const darkThemeColor = encodeURIComponent(DarkThemeMap["color-text-input"]);

  if (props.overlay) {
    return darkThemeColor;
  }

  return themeRule({
    dark: darkThemeColor,
    light: lightThemeColor,
  })(props);
}
