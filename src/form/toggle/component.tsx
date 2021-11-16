import {
  FOCUS_VISIBLE_ATTR,
  getAriaProps,
  getDataProps,
  hoverCss,
  newUUIDv4,
  omitDataProps,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { ForwardRefRenderFunction, forwardRef } from "react";

import { AssistiveText } from "../../assistive-text";
import { InputControlProps } from "../form";
import { focusRingStyleReplacement } from "../common";
import { withOverlayContext } from "../../overlay-region/context";

export interface ToggleProps extends InputControlProps {
  /** @deprecated Ref forwarding is now supported; use the `ref` prop instead of `refDelegate` */
  refDelegate?: InputControlProps["refDelegate"];
  defaultValue?: string;
  overlay?: boolean;
  label?: string;
}

type ScToggleProps = Pick<ToggleProps, "overlay" | "error">;

const TOGGLE_HANDLE_OFFSET = 0.2;
const TOGGLE_HANDLE_SIZE = 1.2;

const ScToggle = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  line-height: 2rem;
`;

const ScToggleInput = styled.input`
  position: absolute;
  opacity: 0;
`;

const ScToggleButton = styled.label<ScToggleProps>`
  display: inline-block;
  position: relative;
  order: 0;
  width: 3.5rem;
  height: 2rem;
  content: "";
  cursor: pointer;
  vertical-align: bottom;
  border-width: 2px;
  border-style: solid;
  border-radius: ${TOGGLE_HANDLE_SIZE / 2 + TOGGLE_HANDLE_OFFSET * 2}rem;
  transition-property: background-color;
  transition-timing-function: ease;
  transition-duration: ${staticTokenRule("timing-short")};

  border-color: ${(props) =>
    themeTokenRule(
      props.error
        ? "color-border-input-error"
        : props.overlay
        ? "color-border-toggle-overlay"
        : "color-border-toggle",
    )};

  background-color: ${(props) =>
    themeTokenRule(
      props.overlay
        ? "color-background-toggle-overlay"
        : "color-background-toggle",
    )};

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: ${TOGGLE_HANDLE_OFFSET}rem;
    bottom: ${TOGGLE_HANDLE_OFFSET}rem;
    left: ${TOGGLE_HANDLE_OFFSET}rem;
    width: ${TOGGLE_HANDLE_SIZE}rem;
    height: ${TOGGLE_HANDLE_SIZE}rem;
    transition-property: left;
    transition-timing-function: ease;
    transition-duration: ${staticTokenRule("timing-short")};
    border-radius: ${staticTokenRule("border-radius-rounded")};

    background-color:${(props) =>
      themeTokenRule(
        props.overlay
          ? "color-background-toggle-handle-overlay"
          : "color-background-toggle-handle",
      )};
  }

  ${hoverCss`
    border-color: ${({ overlay }) =>
      overlay
        ? themeTokenRule("color-border-toggle-overlay-hover")
        : themeTokenRule("color-border-toggle-hover")};
  `}

  ${ScToggleInput}${FOCUS_VISIBLE_ATTR} + && {
    border-color: ${({ overlay }) =>
      overlay
        ? themeTokenRule("color-border-toggle-overlay-focus")
        : themeTokenRule("color-border-toggle-focus")};
      box-shadow: ${themeTokenRule("shadow-input-focus")};
  }

  ${focusRingStyleReplacement(ScToggleInput)}

  ${ScToggleInput}:checked + && {
    border-color: ${(props) =>
      themeTokenRule(
        props.overlay
          ? "color-border-toggle-overlay-checked"
          : "color-border-toggle-checked",
      )};

      background-color: ${(props) =>
        themeTokenRule(
          props.overlay
            ? "color-background-toggle-overlay-checked"
            : "color-background-toggle-checked",
        )};

    &::before {
      border-top-width: 0;
      border-right-width: 0;
      border-bottom-width: 2px;
      border-left-width: 2px;
      border-style: solid;
      border-color: ${(props) =>
        themeTokenRule(
          props.overlay
            ? "color-text-toggle-checked-icon-overlay"
            : "color-text-toggle-checked-icon",
        )};

      display: block;
      position: absolute;
      top: 0.7rem;
      left: 0.8rem;
      width: 0.7rem;
      height: 0.3rem;
      transform: translate3d(-50%, -50%, 0) rotate(-45deg);
      content: "";
    }

    &::after {
      content: "";
      top: ${TOGGLE_HANDLE_OFFSET};
      left: calc(
        100% - ${TOGGLE_HANDLE_SIZE}rem - ${TOGGLE_HANDLE_OFFSET}rem
      );

      background-color: ${(props) =>
        themeTokenRule(
          props.overlay
            ? "color-background-toggle-handle-overlay"
            : "color-background-toggle-handle-checked",
        )}
    }
  }

  ${ScToggleInput}:disabled + && {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const ToggleComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  ToggleProps
> = ({ error, id, label, overlay, ...inputProps }, ref) => {
  const generatedId = newUUIDv4();

  return (
    <ScToggle className="tw-toggle" {...getDataProps(inputProps)}>
      <ScToggleInput
        {...omitDataProps(inputProps)}
        {...getAriaProps(inputProps)}
        ref={ref}
        className="tw-toggle__input"
        id={id ? id : generatedId}
        type="checkbox"
        data-a-target="tw-toggle"
      />
      <ScToggleButton
        htmlFor={id ? id : generatedId}
        className="tw-toggle__button"
        overlay={overlay}
        error={error}
      >
        {label && <AssistiveText>{label}</AssistiveText>}
      </ScToggleButton>
    </ScToggle>
  );
};

ToggleComponent.displayName = "Toggle";
const ComponentWithRef = forwardRef(ToggleComponent);
const ComponentWithOverlayContext = withOverlayContext<
  ToggleProps,
  HTMLInputElement
>(ComponentWithRef);
export { ComponentWithOverlayContext as Toggle };
