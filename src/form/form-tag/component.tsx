import {
  CoreInteractive,
  CoreInteractivePublicProps,
} from "../../core-interactive";
import { SVG, SVGAsset } from "../../svg";
import {
  css,
  focusVisible,
  getAriaProps,
  getDataProps,
  hoverCss,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { FC } from "react";
import { InputSize } from "../form";
import { getInputSizeValue } from "../common";

export enum FormTagStatus {
  Unselected = "unselected",
  Selected = "selected",
  Locked = "locked",
}

export interface FormTagProps extends CoreInteractivePublicProps {
  /** Text to display within the tag. */
  label: string;
  /** Size of the tag. */
  size?: InputSize;
  status?: FormTagStatus | "unselected" | "selected" | "locked"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

interface ScFormTagProps {
  size: InputSize;
  disabled?: boolean;
  status: FormTagStatus | "unselected" | "selected" | "locked"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

const ScFormTag = styled.div<ScFormTagProps>`
  /* Input reset */
  font-family: inherit;
  appearance: none;

  display: flex;
  align-items: center;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  background-clip: padding-box;
  color: ${themeTokenRule("color-text-tag")};
  line-height: 1.4;
  white-space: nowrap;
  padding-right: ${({ size }) =>
    size === InputSize.Large ? "0.6rem" : "0.3rem"};
  padding-left: 0.8rem;
  height: ${getInputSizeValue};
  border-width: ${staticTokenRule("border-width-tag")};
  border-style: ${({ status }) =>
    status === FormTagStatus.Unselected ? "dashed" : "solid"};
  border-color: ${themeTokenRule("color-border-tag")};

  background-color: ${styleVariant("status", {
    [FormTagStatus.Unselected]: "transparent",
    [FormTagStatus.Selected]: themeTokenRule("color-background-tag-default"),
    [FormTagStatus.Locked]: themeTokenRule("color-background-tag-default"),
  })};

  /* Disabled styles */
  ${({ disabled }) =>
    disabled &&
    css`
      &,
      &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `};
`;

const ScFormTagLocked = styled(ScFormTag)<ScFormTagProps>`
  cursor: default;
`;

const ScFormTagDefault = styled(ScFormTag)<ScFormTagProps>`
  /* Interactive styles */
  ${({ disabled }) =>
    !disabled &&
    css`
      ${hoverCss`
        background: ${themeTokenRule(
          "color-background-interactable-alpha-hover",
        )};
        color: ${themeTokenRule("color-text-tag")};
        text-decoration: none;
      `}

      ${focusVisible`
        background: ${themeTokenRule(
          "color-background-interactable-alpha-hover",
        )};
        border-style: solid;
        border-color: ${themeTokenRule("color-border-input-focus")}
      `}

      &:active {
        background: ${themeTokenRule(
          "color-background-interactable-alpha-active",
        )};
      }
    `};
`;

const ScFormTagLayout = styled.div<Pick<ScFormTagProps, "size">>`
  display: flex;
  align-items: center;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  font-weight: ${staticTokenRule("font-weight-semibold")};
  font-size: ${styleVariant("size", {
    [InputSize.Default]: staticTokenRule("font-size-6"),
    [InputSize.Small]: staticTokenRule("font-size-7"),
    [InputSize.Large]: staticTokenRule("font-size-5"),
  })};
`;

const ScFormTagIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${staticTokenRule("border-radius-rounded")};
  width: 1.6rem;
  height: 1.6rem;
`;

export const FormTag: FC<FormTagProps> = ({
  label,
  size = InputSize.Default,
  status = FormTagStatus.Unselected,
  disabled,
  ...formTagProps
}) => {
  const className = "tw-form-tag";
  const FORMTAG_STATUS_ASSET = {
    [FormTagStatus.Unselected]: SVGAsset.Smallplus,
    [FormTagStatus.Selected]: SVGAsset.Smallhide,
    [FormTagStatus.Locked]: SVGAsset.Smalllock,
  };
  const styledProps = {
    size,
    disabled,
    status,
  };

  const asset = FORMTAG_STATUS_ASSET[status];

  const formTagLayout = (
    <ScFormTagLayout size={size}>
      {label}
      <ScFormTagIcon>
        <SVG asset={asset} fill />
      </ScFormTagIcon>
    </ScFormTagLayout>
  );

  if (status === FormTagStatus.Locked) {
    return (
      <ScFormTagLocked
        className={className}
        {...styledProps}
        {...getAriaProps(formTagProps)}
        {...getDataProps(formTagProps)}
      >
        {formTagLayout}
      </ScFormTagLocked>
    );
  } else {
    return (
      <ScFormTagDefault
        className={className}
        as={CoreInteractive}
        {...styledProps}
        {...formTagProps}
        {...getDataProps(formTagProps)}
      >
        {formTagLayout}
      </ScFormTagDefault>
    );
  }
};

FormTag.defaultProps = {
  status: FormTagStatus.Unselected,
  size: InputSize.Default,
};

FormTag.displayName = "FormTag";
