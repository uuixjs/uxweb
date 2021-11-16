import { staticTokenRule, styled, themeTokenRule } from "@uuixjs/uuixweb-lib";

import { FC } from "react";
import { FormRequired } from "../required";
import { withOverlayContext } from "../../overlay-region/context";

export interface FormLabelProps {
  id: string;
  label: string;
  required?: boolean;
  overlay?: boolean;
}

export const ScFormLabel = styled.label<{
  $overlay?: FormLabelProps["overlay"];
}>`
  color: ${({ $overlay }) =>
    $overlay
      ? themeTokenRule("color-text-overlay")
      : themeTokenRule("color-text-label")};
  font-weight: ${staticTokenRule("font-weight-bold")};
`;

export const FormLabelComponent: FC<FormLabelProps> = ({
  id,
  label,
  required,
  overlay,
  ...props
}) => {
  return (
    <ScFormLabel
      className="tw-form-label"
      htmlFor={id}
      $overlay={overlay}
      {...props}
    >
      {required && <FormRequired />}
      {label}
    </ScFormLabel>
  );
};

FormLabelComponent.displayName = "FormLabelComponent";

export const FormLabel = withOverlayContext(FormLabelComponent);
