import { FC } from "react";
import { ScFormLabel } from "../label/component";
import { FormRequired } from "../required";

export interface FormLegendProps {
  label: string;
  required?: boolean;
}

export const FormLegend: FC<FormLegendProps> = ({
  label,
  required,
  ...props
}) => {
  return (
    <ScFormLabel as="legend" className="tw-form-legend" {...props}>
      {required && <FormRequired />}
      {label}
    </ScFormLabel>
  );
};

FormLegend.displayName = "FormLegend";
