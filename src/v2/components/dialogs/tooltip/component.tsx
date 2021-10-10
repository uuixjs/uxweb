import { cloneElement, FC, isValidElement, ReactNode } from "react";
import { Display, InjectLayout } from "../../layout";
import { TooltipLayer, TooltipLayerProps } from "../tooltip-layer";
import {
  useTooltipState,
  UseTooltipStateConfig,
} from "../utils/use-tooltip-state";
import { TooltipWrapper, TooltipWrapperProps } from "./tooltip-wrapper";

export interface TooltipProps extends TooltipWrapperProps {
  /** The text to display inside the Tooltip. */
  label: ReactNode;
  /** Component which the tooltip will be associated with, such as a `<ButtonIcon>` */
  children?: ReactNode;
  /** Prevent the tooltip from appearing during user interaction */
  disabled?: boolean;
  /** Always show the tooltip regardless of user interaction */
  show?: boolean;
  display?: Display;

  /** Accepts any valid Popper.js options. See https://popper.js.org/docs */
  options?: TooltipLayerProps["options"];
  /** Allows you to obtain a Ref to the underlying Popper.js instance */
  popperRef?: TooltipLayerProps["popperRef"];
  /** Callback when dialog enter transition has completed. */
  onEnterComplete?: TooltipLayerProps["onEnterComplete"];
  /** Callback when dialog exit transition has completed. */
  onExitComplete?: TooltipLayerProps["onExitComplete"];
  transitionType?: TooltipLayerProps["transitionType"];
  transitionDuration?: TooltipLayerProps["transitionDuration"];

  /** Time in milliseconds to debounce mouse hover interactions before displaying the Tooltip */
  enterDelay?: UseTooltipStateConfig["enterDelay"];
}

/**
 * Tooltip which uses React Portals to render at top of the document
 * and also has smart-position-adjustment with Popper.js
 */
export const Tooltip: FC<TooltipProps> = ({
  label,
  children,
  disabled,
  show,
  options,
  display = Display.InlineFlex,
  popperRef,
  onEnterComplete,
  onExitComplete,
  transitionType,
  transitionDuration,
  enterDelay,
  id: providedId,
  ...otherProps
}) => {
  const { anchorProps, tooltipProps } = useTooltipState({
    enterDelay,
    id: providedId,
  });

  let showTooltip: boolean;
  if (show) {
    showTooltip = true;
  } else if (disabled) {
    showTooltip = false;
  } else {
    showTooltip = tooltipProps.show;
  }

  const {
    ["aria-describedby"]: ariaDescribedBy,
    ...anchorWrapperProps
  } = anchorProps;

  return (
    <>
      <InjectLayout display={display}>
        <div {...anchorWrapperProps}>
          {isValidElement(children) &&
          children.props["aria-describedby"] === undefined &&
          children.props["aria-label"] !== label
            ? cloneElement(children, {
                "aria-describedby": ariaDescribedBy,
              })
            : children}
        </div>
      </InjectLayout>
      <TooltipLayer
        {...tooltipProps}
        show={showTooltip}
        options={options}
        popperRef={popperRef}
        onEnterComplete={onEnterComplete}
        onExitComplete={onExitComplete}
        transitionType={transitionType}
        transitionDuration={transitionDuration}
      >
        <TooltipWrapper {...otherProps}>{label}</TooltipWrapper>
      </TooltipLayer>
    </>
  );
};

Tooltip.displayName = "Tooltip";
