import {
  Display,
  FlexWrap,
  FontSize,
  Layout,
  LayoutProps,
  Position,
} from "../../layout";
import { FC, ReactNode } from "react";
import {
  newUUIDv4,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { FormError } from "../error";
import { FormHint } from "../hint";
import { FormLabel } from "../label";
import { FormLegend } from "../legend";

export enum FormGroupOrientation {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

export enum FormGroupControls {
  Single = "single",
  Multiple = "multiple",
}

export interface FormGroupProps {
  controls?: FormGroupControls | "single" | "multiple"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
  /**
   * @example <Input type={InputType.Text} placeholder="Video Title" />
   */
  children?: ReactNode;
  error?: ReactNode;
  /** @deprecated Set an error message on `error` to toggle and display an error message. */
  errorMessage?: string;
  hint?: ReactNode;
  id?: string;
  /**
   * @example Title
   */
  label: ReactNode;
  /** @deprecated Please include this as part of the `label` prop.  */
  labelOptional?: string;
  required?: boolean;
  orientation?: FormGroupOrientation | "vertical" | "horizontal"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}

export const formGroupHorizontalLabelWidth = "18rem";
export const FORM_GROUP_HORIZONTAL_LABEL_TEST_SELECTOR =
  "tw-form-group__label-container";

export const ScFormGroupOptional = styled.span`
  color: ${themeTokenRule("color-text-label-optional")};
  padding-left: ${staticTokenRule("space-05")};
  font-weight: ${staticTokenRule("font-weight-normal")};
`;

export const FormGroup: FC<FormGroupProps> = ({
  children,
  controls,
  error,
  errorMessage,
  hint,
  id,
  label,
  labelOptional,
  required,
  orientation,
  ...props
}) => {
  let labelElement: ReactNode;
  let optionalLabel: ReactNode;
  let formHint: ReactNode;
  let container: "fieldset" | "div";

  const generatedId = newUUIDv4();

  if (labelOptional) {
    optionalLabel = (
      <ScFormGroupOptional>({labelOptional})</ScFormGroupOptional>
    );
  }

  if (hint && !error) {
    formHint = typeof hint === "string" ? <FormHint hint={hint} /> : hint;
  } else if (error) {
    formHint =
      typeof error === "string" ? (
        <FormError errorMessage={error} />
      ) : error === true && errorMessage ? (
        <FormError errorMessage={errorMessage} />
      ) : (
        error
      );
  }

  if (formHint) {
    formHint = <Layout margin={{ top: 0.5 }}>{formHint}</Layout>;
  }

  if (controls === FormGroupControls.Multiple) {
    labelElement =
      typeof label === "string" ? <FormLegend label={label} /> : label;
    container = "fieldset";
  } else {
    labelElement =
      typeof label === "string" ? (
        <FormLabel
          id={id ? id : generatedId}
          required={required}
          label={label}
        />
      ) : (
        label
      );
    container = "div";
  }

  labelElement = labelElement && (
    <Layout margin={{ bottom: 0.5 }}>
      {labelElement}
      {typeof label === "string" && optionalLabel}
    </Layout>
  );

  const controlsProps: LayoutProps = {
    className: "tw-form-group",
    position: Position.Relative,
    flexGrow: 1,
    fontSize: FontSize.Size6,
    ...props,
  };

  if (orientation === FormGroupOrientation.Horizontal) {
    return (
      <Layout
        as={container}
        display={Display.Flex}
        flexWrap={FlexWrap.NoWrap}
        {...controlsProps}
      >
        <Layout
          data-test-selector={FORM_GROUP_HORIZONTAL_LABEL_TEST_SELECTOR}
          width={formGroupHorizontalLabelWidth}
          flexShrink={0}
          padding={{ right: 2 }}
        >
          {labelElement}
        </Layout>
        <Layout flexGrow={1}>
          {children}
          {formHint}
        </Layout>
      </Layout>
    );
  } else {
    return (
      <Layout as={container} {...controlsProps}>
        {labelElement}
        {children}
        {formHint}
      </Layout>
    );
  }
};

FormGroup.displayName = "FormGroup";
