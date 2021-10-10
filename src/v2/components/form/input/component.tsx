import {
  BorderRadius,
  BorderRadiusValues,
  cn,
  getAriaProps,
  getDataProps,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib";
import {
  FormEvent,
  FormEventHandler,
  ForwardRefRenderFunction,
  HTMLAttributes,
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
  forwardRef,
} from "react";
import { INPUT_BORDER_RADIUS, INPUT_SIZES, InputSize } from "../form";
import { InjectLayout, Layout, Position, TextAlign } from "../../layout";

import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { ScInputBase } from "../common";
import { withOverlayContext } from "../../overlay-region/context";

export enum InputType {
  Text = 0,
  Number = 1,
  Email = 2,
  Password = 3,
  Search = 4,
}

export enum InputRounding {
  Default = "default",
  Left = "left",
  Right = "right",
}

export interface InputProps {
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label"?: string;
  autoCapitalize?: boolean;
  autoComplete?: string;
  autoCorrect?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  icon?: SVGAsset;
  iconRight?: boolean;
  id?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  list?: string;
  maxLength?: number;
  name?: string;
  onBlur?: FormEventHandler<HTMLInputElement>;
  onChange?: FormEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLElement>;
  onFocus?: FormEventHandler<HTMLInputElement>;
  onFocusSelectContent?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  spellCheck?: boolean;
  tabIndex?: number;
  min?: number;
  max?: number;
  rounding?: InputRounding;
  size?: InputSize;
  step?: number;
  textAlign?: TextAlign.Left | TextAlign.Right | TextAlign.Center;
  /**
   * @example Text
   */
  type: InputType;
  value?: string;
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: Ref<HTMLInputElement>;
  defaultValue?: string;
  overlay?: boolean;
}

interface ScInputProps {
  $size?: InputSize;
}

const ScInput = styled(ScInputBase)<ScInputProps>`
  display: block;
  width: 100%;
  height: ${styleVariant("$size", {
    [InputSize.Small]: staticTokenRule("input-size-small"),
    [InputSize.Default]: staticTokenRule("input-size-default"),
    [InputSize.Large]: staticTokenRule("input-size-large"),
  })};

  padding: ${({ $size }) => {
    if ($size === InputSize.Small) {
      return "0.2rem 0";
    }
    // No default value
  }};

  /* stylelint-disable property-no-vendor-prefix */
  &[type="number"] {
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
  }
`;

interface ScInputIconWrapperProps {
  iconRight?: boolean;
  overlay?: boolean;
}

const ScInputIconWrapper = styled.div<ScInputIconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-width: 3rem;
  position: absolute;
  top: 0;
  right: ${({ iconRight }) => (iconRight ? 0 : undefined)};
  left: ${({ iconRight }) => (iconRight ? undefined : 0)};
  color: ${({ overlay }) =>
    themeTokenRule(
      overlay ? "color-text-input-placeholder-overlay" : "color-text-alt-2",
    )};
`;

export const InputComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (props, ref) => {
  let icon: JSX.Element | undefined;

  let inputSize = InputSize.Default;
  if (props.size) {
    inputSize = props.size;
  }

  const classes: ClassValue = {
    "tw-input": true,
    "tw-input--small": props.size === InputSize.Small,
    "tw-input--large": props.size === InputSize.Large,
    "tw-input--error": props.error,
    "tw-input--overlay": props.overlay,
    "tw-input--password": props.type === InputType.Password,
  };

  const radius = props.size
    ? INPUT_BORDER_RADIUS[props.size]
    : BorderRadius.Medium;
  const rounding: BorderRadiusValues = {
    topLeft: radius,
    topRight: radius,
    bottomLeft: radius,
    bottomRight: radius,
  };

  if (props.rounding === InputRounding.Left) {
    rounding.topRight = BorderRadius.None;
    rounding.bottomRight = BorderRadius.None;
  } else if (props.rounding === InputRounding.Right) {
    rounding.topLeft = BorderRadius.None;
    rounding.bottomLeft = BorderRadius.None;
  }

  if (props.icon) {
    icon = (
      <ScInputIconWrapper
        className={cn({
          "tw-input__icon": true,
          "tw-input__icon--overlay": props.overlay,
        })}
        overlay={props.overlay}
        iconRight={props.iconRight}
      >
        <Icon asset={props.icon} />
      </ScInputIconWrapper>
    );
  }

  return (
    <Layout position={Position.Relative} {...getDataProps(props)}>
      {icon}
      <InjectLayout
        borderRadius={rounding}
        padding={{
          left: props.icon && !props.iconRight ? 3 : 1,
          right: props.iconRight ? 3 : 1,
          y: props.size === InputSize.Small ? undefined : 0.5,
        }}
        fontSize={INPUT_SIZES[inputSize]}
        textAlign={props.textAlign}
      >
        <ScInput
          {...getAriaProps(props)}
          ref={ref || props.refDelegate}
          type={InputType[props.type].toLowerCase()}
          className={cn(classes)}
          placeholder={props.placeholder}
          autoCapitalize={props.autoCapitalize ? "on" : "off"}
          autoCorrect={props.autoCorrect ? "on" : "off"}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          data-a-target="tw-input"
          defaultValue={props.defaultValue}
          disabled={props.disabled}
          id={props.id}
          inputMode={props.inputMode}
          list={props.list}
          name={props.name}
          onBlur={props.onBlur}
          onChange={props.onChange}
          onClick={props.onClick}
          onFocus={onInputFocus}
          onKeyDown={props.onKeyDown}
          pattern={props.pattern}
          max={props.max}
          maxLength={props.maxLength}
          min={props.min}
          readOnly={props.readOnly}
          required={props.required}
          spellCheck={props.spellCheck}
          step={props.step}
          tabIndex={props.tabIndex}
          value={props.value}
          error={props.error}
          overlay={props.overlay}
          $size={inputSize}
        />
      </InjectLayout>
    </Layout>
  );

  function onInputFocus(e: FormEvent<HTMLInputElement>) {
    if (props.onFocusSelectContent) {
      e.currentTarget.select();
    }

    if (props.onFocus) {
      props.onFocus(e);
    }
  }
};

InputComponent.displayName = "Input";
const ComponentWithRef = forwardRef(InputComponent);
const ComponentWithOverlayContext = withOverlayContext<
  InputProps,
  HTMLInputElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as Input };
