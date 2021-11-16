import { FC, ReactNode } from "react";
import {
  a11yHide,
  focusVisible,
  getAriaProps,
  getDataProps,
  hoverCss,
  omitDataProps,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { CoreButtonLabel } from "../../../button/core-button/core-button-label";
import { InputControlProps } from "../../form";
import { focusRingStyleReplacement } from "../../common";

export enum SegmentedButtonType {
  Radio = "radio",
  Checkbox = "checkbox",
}

export interface SegmentedButtonOptionProps extends InputControlProps {
  children?: ReactNode;
  defaultValue?: string;
  /**
   * @example Option
   */
  label?: string;
  type?: SegmentedButtonType | "radio" | "checkbox"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

const ScSegmentedButtonOption = styled.label`
  display: flex;
  border: ${staticTokenRule("border-width-input")} solid
    ${themeTokenRule("color-background-button-primary-default")};
  background-color: ${themeTokenRule("color-background-button-text-default")};
  color: ${themeTokenRule("color-text-button-text")};
  font-weight: ${staticTokenRule("font-weight-semibold")};
  cursor: pointer;
  position: relative; /* wraps a position: absolute later on */

  &:first-child {
    border-top-left-radius: ${staticTokenRule("border-radius-medium")};
    border-bottom-left-radius: ${staticTokenRule("border-radius-medium")};
  }

  &:last-child {
    border-top-right-radius: ${staticTokenRule("border-radius-medium")};
    border-bottom-right-radius: ${staticTokenRule("border-radius-medium")};
  }

  &:nth-of-type(n + 2) {
    &,
    &:focus,
    &:active {
      border-left: none;
    }

    ${hoverCss`
      border-left: none;
    `}
  }

  ${hoverCss`
    background-color: ${themeTokenRule("color-background-button-text-hover")};
  `};

  ${focusVisible`
    background-color: ${themeTokenRule("color-background-button-text-hover")};
    box-shadow: ${themeTokenRule("shadow-button-focus")};
  `}

  &:active {
    background-color: ${themeTokenRule("color-background-button-text-active")};
    box-shadow: ${themeTokenRule("shadow-button-active")};
  }
`;

const ScSegmentedButtonOptionInput = styled.input`
  ${a11yHide};
`;

const ScSegmentedButtonOptionLabel = styled.div`
  display: flex;
  align-self: stretch;

  ${focusRingStyleReplacement(ScSegmentedButtonOptionInput)};

  ${ScSegmentedButtonOptionInput}[data-focus-visible-added] + && {
    background-color: ${themeTokenRule("color-background-button-text-hover")};
    box-shadow: ${themeTokenRule("shadow-button-focus")};
  }

  /* stylelint-disable-next-line selector-max-type, selector-type-no-unknown */
  ${ScSegmentedButtonOptionInput}:active + && {
    background-color: ${themeTokenRule("color-background-button-text-active")};
    box-shadow: ${themeTokenRule("shadow-button-active")};
  }

  /* stylelint-disable-next-line selector-max-type, selector-type-no-unknown */
  ${ScSegmentedButtonOptionInput}:checked + && {
    background-color: ${themeTokenRule(
      "color-background-button-primary-default",
    )};
    color: ${themeTokenRule("color-text-button-primary")};

    /* stylelint-disable-next-line selector-max-type */
    ${ScSegmentedButtonOptionInput}[data-focus-visible-added] + && {
      background-color: ${themeTokenRule("color-background-button-focus")};
    }

    /* stylelint-disable-next-line selector-max-type, selector-type-no-unknown */
    ${ScSegmentedButtonOptionInput}:active + && {
      background-color: ${themeTokenRule("color-background-button-active")};
    }
  }
`;

const ScSegmentedButtonOptionLabelText = styled.div`
  vertical-align: middle;
  position: relative;
  justify-content: center;
  align-self: center;
  font-size: ${staticTokenRule("font-size-6")};
  padding: 0 ${staticTokenRule("space-1")};
  text-decoration: none;
  white-space: nowrap;
`;

export const SegmentedButtonOption: FC<SegmentedButtonOptionProps> = ({
  children,
  error,
  label,
  refDelegate,
  ...inputProps
}) => {
  const labelText = typeof children === "string" ? children : label;

  return (
    <ScSegmentedButtonOption
      className="tw-segmented-button-option"
      htmlFor={inputProps.id}
      {...getDataProps(inputProps)}
    >
      <ScSegmentedButtonOptionInput
        {...omitDataProps(inputProps)}
        {...getAriaProps(inputProps)}
        className="tw-segmented-button-option__input"
        ref={refDelegate}
        data-a-target="tw-segmented-button-option"
      />
      <ScSegmentedButtonOptionLabel
        className="tw-segmented-button-option__label"
        aria-label={children ? label : undefined}
      >
        {(label && !children) || typeof children === "string" ? (
          <ScSegmentedButtonOptionLabelText className="tw-segmented-button-option__text">
            <CoreButtonLabel>{labelText}</CoreButtonLabel>
          </ScSegmentedButtonOptionLabelText>
        ) : (
          children
        )}
      </ScSegmentedButtonOptionLabel>
    </ScSegmentedButtonOption>
  );
};

SegmentedButtonOption.defaultProps = {
  type: SegmentedButtonType.Radio,
};

SegmentedButtonOption.displayName = "SegmentedButtonOption";
