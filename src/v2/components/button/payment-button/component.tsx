import {
  CoreButton,
  CoreButtonPublicProps,
  CoreButtonType,
} from "../core-button";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";
import {
  css,
  focusVisible,
  hoverCss,
  staticTokenRule,
  styleVariant,
  styled,
  themeTokenRule,
} from "lib/ui-utils";

export interface PaymentButtonProps extends CoreButtonPublicProps {
  children?: ReactNode;
  variant:
    | PaymentButtonType
    | "xsolla"
    | "amazon-pay"
    | "paypal-blue"
    | "paypal-yellow"; // TODO: https://jira.xarth.tv/browse/COREUI-3554
}

export enum PaymentButtonType {
  Xsolla = "xsolla",
  AmazonPay = "amazon-pay",
  PaypalBlue = "paypal-blue",
  PaypalYellow = "paypal-yellow",
}

const hoverActiveStyles = css`
  &::before {
    background-color: ${themeTokenRule(
      "color-background-interactable-alpha-hover",
    )};
  }
  &:active {
    &::before {
      background-color: ${themeTokenRule(
        "color-background-interactable-alpha-active",
      )};
    }
  }
`;
export const ScPaymentButton = styled(CoreButton)<{
  $variant:
    | PaymentButtonType
    | "xsolla"
    | "amazon-pay"
    | "paypal-blue"
    | "paypal-yellow"; // TODO: https://jira.xarth.tv/browse/COREUI-3554;
}>`
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  background-color: ${styleVariant("$variant", {
    [PaymentButtonType.AmazonPay]: staticTokenRule("color-amazon"),
    [PaymentButtonType.PaypalBlue]: staticTokenRule("color-paypal-blue"),
    [PaymentButtonType.PaypalYellow]: staticTokenRule("color-paypal-yellow"),
    [PaymentButtonType.Xsolla]: "",
  })};

  color: ${styleVariant("$variant", {
    [PaymentButtonType.AmazonPay]: staticTokenRule("color-black"),
    [PaymentButtonType.PaypalBlue]: themeTokenRule("color-text-overlay"),
    [PaymentButtonType.PaypalYellow]: staticTokenRule("color-black"),
    [PaymentButtonType.Xsolla]: "",
  })};

  ${(props) =>
    !props.disabled &&
    css`
      ${hoverCss`${hoverActiveStyles}`}
      ${focusVisible`${hoverActiveStyles}`}
    `}
`;

const ScPaymentButtonLayout = styled.div`
  padding: ${staticTokenRule("button-padding-x")};
  position: relative;
  display: flex;
  align-items: center;
`;

const PaymentButton: ForwardRefRenderFunction<
  HTMLElement,
  PaymentButtonProps
> = ({ children, variant, ...buttonProps }, ref) => {
  if (variant === PaymentButtonType.Xsolla) {
    return (
      <CoreButton
        {...buttonProps}
        ref={ref}
        className="tw-payment-button"
        variant={CoreButtonType.Secondary}
      >
        <ScPaymentButtonLayout>{children}</ScPaymentButtonLayout>
      </CoreButton>
    );
  }

  return (
    <ScPaymentButton
      {...buttonProps}
      ref={ref}
      className="tw-payment-button"
      $variant={variant}
    >
      <ScPaymentButtonLayout>{children}</ScPaymentButtonLayout>
    </ScPaymentButton>
  );
};

PaymentButton.displayName = "PaymentButton";
const ComponentWithRef = forwardRef(PaymentButton);
export { ComponentWithRef as PaymentButton };
