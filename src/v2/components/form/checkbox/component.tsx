import { ForwardRefRenderFunction, MutableRefObject, forwardRef } from "react";
import { INPUT_SIZES, InputControlProps, InputSize } from "../form";
import { Layout, Position } from "../../layout";
import { ScCheckBoxInputBase, ScCheckBoxLabelBase } from "../common";
import {
  cn,
  css,
  getAriaProps,
  getDataProps,
  newUUIDv4,
  omitDataProps,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

import { withOverlayContext } from "../../overlay-region/context";

const ScCheckBoxLabel = styled(ScCheckBoxLabelBase)`
  &::before {
    border-radius: ${staticTokenRule("border-radius-small")};
  }

  ${/* sc-selector */ ScCheckBoxInputBase}:indeterminate + && {
    &::before {
      border-style: solid;
      border-width: ${staticTokenRule("border-width-input")};
      border-color: ${themeTokenRule("color-border-input-checkbox-checked")};
      background-color: ${themeTokenRule(
        "color-background-input-checkbox-checked-background",
      )};
    }

    &::after {
      background-color: ${themeTokenRule(
        "color-background-input-checkbox-checked",
      )};
      display: block;
      position: absolute;
      top: 50%;
      left: 0.4rem;
      width: 0.8rem;
      height: 0.2rem;
      transform: translateY(-50%);
      content: "";
    }

    /** Overlay style overrides */
    ${({ overlay }) =>
      overlay &&
      css`
        &::before {
          border-color: ${themeTokenRule(
            "color-border-input-checkbox-checked-overlay",
          )};
          background-color: ${themeTokenRule(
            "color-background-input-checkbox-checked-background-overlay",
          )};
        }

        &::after {
          background-color: ${themeTokenRule(
            "color-background-input-checkbox-checked-overlay",
          )};
        }
      `}
  }
`;

export interface CheckBoxProps extends InputControlProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: InputControlProps["refDelegate"];
  label: string | null;
  /**
   * Passes an `aria-label` to the component to provide context to assistive
   * devices. All standard HTML aria attributes are now supported on Core UI
   * components — see https://www.w3.org/TR/html-aria/."
   */
  "aria-label"?: string;
  size?: InputSize.Default | InputSize.Large | "default" | "large"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;;
  overlay?: boolean;
  indeterminate?: boolean;
}

export const CheckBoxComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = (
  {
    error,
    id,
    indeterminate,
    label,
    overlay,
    refDelegate,
    size = InputSize.Default,
    ...inputProps
  },
  ref,
) => {
  const generatedId = newUUIDv4();
  const classes: ClassValue = {
    "tw-checkbox": true,
    "tw-checkbox--error": error,
    "tw-checkbox--overlay": overlay,
  };
  const checkboxRef = (refValue: HTMLInputElement) => {
    if (refValue) {
      refValue.indeterminate = !!indeterminate;
    }

    if (typeof ref === "function") {
      ref(refValue);
    } else if (ref) {
      (ref as MutableRefObject<HTMLInputElement>).current = refValue;
    } else if (typeof refDelegate === "function") {
      refDelegate(refValue);
    } else if (refDelegate) {
      (refDelegate as MutableRefObject<HTMLInputElement>).current = refValue;
    }
  };

  return (
    <Layout
      className={cn(classes)}
      fontSize={INPUT_SIZES[size]}
      position={Position.Relative}
      {...getDataProps(inputProps)}
    >
      <ScCheckBoxInputBase
        {...omitDataProps(inputProps)}
        {...getAriaProps(inputProps)}
        className="tw-checkbox__input"
        type="checkbox"
        data-a-target="tw-checkbox"
        id={id ? id : generatedId}
        ref={checkboxRef}
        aria-label={label === undefined ? inputProps["aria-label"] : undefined}
      />
      <ScCheckBoxLabel
        className="tw-checkbox__label"
        htmlFor={id ? id : generatedId}
        overlay={overlay}
        error={error}
      >
        {label && <Layout margin={{ left: 1 }}>{label}</Layout>}
      </ScCheckBoxLabel>
    </Layout>
  );
};

CheckBoxComponent.displayName = "CheckBox";
const ComponentWithRef = forwardRef(CheckBoxComponent);
const ComponentWithOverlayContext = withOverlayContext<
  CheckBoxProps,
  HTMLInputElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as CheckBox };
