import {
  CoreButton,
  CoreButtonRounding,
  CoreButtonSize,
  CoreButtonType,
} from "../../button/core-button";
import { Display, Layout } from "../../layout";
import { FC, ReactNode } from "react";
import { Input, InputProps, InputRounding } from "../input/component";
import { cn, getAriaProps, getDataProps, styled } from "lib/ui-utils";

import { CoreButtonIcon } from "../../button/core-button/core-button-icon";
import { CoreButtonLabel } from "../../button/core-button/core-button-label";
import { CoreInteractivePublicProps } from "../../core-interactive";
import { InputSize } from "../form";
import { SVGAsset } from "../../svg";

export interface ComboInputButtonProps extends CoreInteractivePublicProps {
  type?: CoreButtonType.Primary | CoreButtonType.Secondary;
  icon?: SVGAsset;
  children?: ReactNode;
}

export interface ComboInputProps extends InputProps {
  /**
   * @example { children: 'Copy' }
   */
  buttonProps: ComboInputButtonProps;
}

const ScInputWrapper = styled.div`
  flex-grow: 1;
  margin-right: 1px;
`;

const ScButtonIconWrapper = styled.div<{ $size?: InputSize }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $size }) =>
    $size === InputSize.Large
      ? "0 0.5rem"
      : $size === InputSize.Small
      ? "0 0.3rem"
      : "0 0.4rem"};
`;

export const ComboInput: FC<ComboInputProps> = (props) => {
  const INPUT_BUTTON_SIZES = {
    [InputSize.Small]: CoreButtonSize.Small,
    [InputSize.Default]: CoreButtonSize.Default,
    [InputSize.Large]: CoreButtonSize.Large,
  };

  let iconClasses: ClassValue | undefined;

  if (props.buttonProps.icon && !props.buttonProps.children) {
    iconClasses = {
      "tw-combo-input__button-icon": true,
      "tw-combo-input__button-icon--small": props.size === InputSize.Small,
      "tw-combo-input__button-icon--large": props.size === InputSize.Large,
    };
  }

  let label: JSX.Element | undefined;

  if (props.buttonProps.children) {
    label = (
      <CoreButtonLabel
        icon={props.buttonProps.icon}
        size={props.size ? INPUT_BUTTON_SIZES[props.size] : undefined}
      >
        {props.buttonProps.children}
      </CoreButtonLabel>
    );
  } else if (props.buttonProps.icon) {
    label = (
      <ScButtonIconWrapper $size={props.size}>
        <CoreButtonIcon
          icon={props.buttonProps.icon}
          size={props.size ? INPUT_BUTTON_SIZES[props.size] : undefined}
        />
      </ScButtonIconWrapper>
    );
  }

  return (
    <Layout
      className="tw-combo-input"
      display={Display.Flex}
      fullWidth
      {...getDataProps(props)}
      {...getAriaProps(props)}
    >
      <ScInputWrapper className="tw-combo-input__input">
        <Input rounding={InputRounding.Left} {...props} />
      </ScInputWrapper>
      <CoreButton
        {...props.buttonProps}
        className={cn(iconClasses)}
        rounding={CoreButtonRounding.Right}
        size={props.size ? INPUT_BUTTON_SIZES[props.size] : undefined}
        variant={
          props.buttonProps.type
            ? props.buttonProps.type
            : CoreButtonType.Primary
        }
      >
        {label}
      </CoreButton>
    </Layout>
  );
};

ComboInput.displayName = "ComboInput";
