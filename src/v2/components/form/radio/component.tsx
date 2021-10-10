import { ForwardRefRenderFunction, forwardRef } from "react";
import { INPUT_SIZES, InputControlProps, InputSize } from "../form";
import { Layout, Position } from "../../layout";
import { ScCheckBoxInputBase, ScCheckBoxLabelBase } from "../common";
import {
  cn,
  getAriaProps,
  getDataProps,
  newUUIDv4,
  omitDataProps,
  styled,
} from "lib/ui-utils";

import { withOverlayContext } from "../../overlay-region/context";

const ScRadioLabel = styled(ScCheckBoxLabelBase)`
  &::before,
  &::after {
    border-radius: 50%;
  }
`;

export interface RadioProps extends InputControlProps {
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
}

export const RadioComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  RadioProps
> = (
  {
    error,
    id,
    label,
    overlay,
    size = InputSize.Default,
    refDelegate,
    ...inputProps
  },
  ref,
) => {
  const generatedId = `tw-${newUUIDv4()}`;
  const classes: ClassValue = {
    "tw-radio": true,
    "tw-radio--error": error,
    "tw-radio--overlay": overlay,
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
        ref={ref || refDelegate}
        type="radio"
        className="tw-radio__input"
        data-a-target="tw-radio"
        id={id ? id : generatedId}
        aria-label={label === undefined ? inputProps["aria-label"] : undefined}
      />
      <ScRadioLabel
        className="tw-radio__label"
        htmlFor={id ? id : generatedId}
        overlay={overlay}
        error={error}
      >
        {label && <Layout margin={{ left: 1 }}>{label}</Layout>}
      </ScRadioLabel>
    </Layout>
  );
};

RadioComponent.displayName = "Radio";
const ComponentWithRef = forwardRef(RadioComponent);
const ComponentWithOverlayContext = withOverlayContext<
  RadioProps,
  HTMLInputElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as Radio };
