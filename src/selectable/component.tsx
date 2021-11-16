import {
  BorderRadius,
  a11yHide,
  css,
  hoverCss,
  hoverCssWithSelector,
  newUUIDv4,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { Component, ReactNode } from "react";

import { InputControlProps } from "../form/form";
import { ThemeToken } from "lib/ui-tokens";
import { withOverlayContext } from "../overlay-region/context";

export enum SelectableType {
  Checkbox = "checkbox",
  Radio = "radio",
}

export interface SelectableProps extends InputControlProps {
  /** Sets the image border radius. When using Selectable with a circle, select BorderRadius.Rounded. */
  borderRadius?: BorderRadius;
  /** Selectable can behave as a radio or checkbox. */
  type: SelectableType | "checkbox" | "radio"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /** Sets overlay representation */
  overlay?: boolean;
  /** Offers ability to add any custom children to receive selectable visual treatment.  */
  children?: ReactNode;
}

interface ScSelectableProps {
  borderRadius: BorderRadius;
  error?: boolean;
  overlay?: boolean;
}

const getBorderValue = (colorToken: ThemeToken) => css`
  ${staticTokenRule("border-width-input")} solid
    ${themeTokenRule(colorToken)};
`;

const getBoxShadowValue = (colorToken: ThemeToken) => css`
  inset 0 0 0 ${staticTokenRule("border-width-input")} ${themeTokenRule(
  colorToken,
)}
`;

const getBorderRadiusValue = styleVariant<ScSelectableProps, "borderRadius">(
  "borderRadius",
  {
    [BorderRadius.None]: staticTokenRule("border-radius-none"),
    [BorderRadius.Small]: staticTokenRule("border-radius-small"),
    [BorderRadius.Medium]: staticTokenRule("border-radius-medium"),
    [BorderRadius.Large]: staticTokenRule("border-radius-large"),
    [BorderRadius.Rounded]: staticTokenRule("border-radius-rounded"),
  },
);

export const ScSelectableInput = styled.input`
  ${a11yHide}
`;

export const ScSelectableLabel = styled.label<ScSelectableProps>`
  display: block;
  position: relative;
  cursor: pointer;
  padding: 0.2rem;
  border: ${({ error, overlay }) =>
    error
      ? getBorderValue("color-border-error")
      : overlay
      ? getBorderValue("color-border-selectable-overlay")
      : getBorderValue("color-border-selectable")};
  box-shadow: ${({ error, overlay }) =>
    error
      ? getBoxShadowValue("color-border-selectable-selected-inner")
      : overlay
      ? getBoxShadowValue("color-border-selectable-overlay")
      : getBoxShadowValue("color-border-selectable")};

  border-radius: ${getBorderRadiusValue};

  ${hoverCss`
    border: ${({ error, overlay }) =>
      error
        ? undefined
        : overlay
        ? getBorderValue("color-border-selectable-overlay-hover")
        : getBorderValue("color-border-selectable-hover")};
    box-shadow: ${({ error, overlay }) =>
      error
        ? undefined
        : overlay
        ? getBoxShadowValue("color-border-selectable-overlay-hover")
        : getBoxShadowValue("color-border-selectable-hover")};
  `}

  ${ScSelectableInput}[data-focus-visible-added] + && {
    border-color: ${({ error }) =>
      error
        ? themeTokenRule("color-border-error")
        : themeTokenRule("color-border-toggle-focus")};
    box-shadow: ${({ error }) =>
      error
        ? getBoxShadowValue("color-border-error")
        : getBoxShadowValue("color-border-toggle-focus")};
  }

  ${ScSelectableInput}:checked + && {
    border: ${({ overlay }) =>
      overlay
        ? getBorderValue("color-border-selectable-overlay-selected")
        : getBorderValue("color-border-selectable-selected-outer")};
    box-shadow: ${({ overlay }) =>
      overlay
        ? getBoxShadowValue("color-border-selectable-overlay-selected")
        : getBoxShadowValue("color-border-selectable-selected-inner")};
  }

  ${hoverCssWithSelector(`${ScSelectableInput}:checked:hover + &&`)`
    border: ${({ overlay }) =>
      overlay
        ? getBorderValue("color-border-selectable-overlay-selected")
        : getBorderValue("color-border-selectable-selected-outer")};
    box-shadow: ${({ overlay }) =>
      overlay
        ? getBoxShadowValue("color-border-selectable-overlay-selected")
        : getBoxShadowValue("color-border-selectable-hover-selected")};
  `}
  }

  ${ScSelectableInput}:checked[data-focus-visible-added] + && {
    border: ${({ overlay }) =>
      overlay
        ? getBorderValue("color-border-selectable-overlay-selected")
        : getBorderValue("color-border-selectable-selected-outer")};
    box-shadow: ${({ overlay }) =>
      overlay
        ? getBoxShadowValue("color-border-selectable-overlay-selected")
        : getBoxShadowValue("color-border-selectable-selected-outer")};
  }

  ${ScSelectableInput}:disabled + && {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ScSelectableChildren = styled.div<
  Pick<ScSelectableProps, "borderRadius">
>`
  position: relative;
  border-radius: calc(${getBorderRadiusValue} / 2);
`;

export class SelectableComponent extends Component<SelectableProps, {}> {
  public static displayName: string;

  public render() {
    const generatedId = newUUIDv4();

    const {
      borderRadius = BorderRadius.None,
      children,
      error,
      id,
      refDelegate,
      overlay,
      ...inputProps
    } = this.props;

    return (
      <div className="tw-selectable">
        <ScSelectableInput
          data-a-target="tw-selectable"
          id={id ? id : generatedId}
          ref={refDelegate}
          {...inputProps}
        />
        <ScSelectableLabel
          htmlFor={id ? id : generatedId}
          error={error}
          overlay={overlay}
          borderRadius={borderRadius}
        >
          <ScSelectableChildren borderRadius={borderRadius}>
            {children}
          </ScSelectableChildren>
        </ScSelectableLabel>
      </div>
    );
  }
}

SelectableComponent.displayName = "SelectableComponent";

export const Selectable = withOverlayContext(SelectableComponent);
