import {
  CoreButton,
  CoreButtonPublicProps,
  CoreButtonType,
} from "../core-button";
import {
  DataTestSelectorProps,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";
import { ForwardRefRenderFunction, ReactNode, forwardRef } from "react";

import { CoreButtonLabel } from "../core-button/core-button-label";
import { JustifyContent } from "../../layout";
import { SVGAsset } from "../../svg";
import { TEST_AUTOMATION_SELECTORS } from "../../_tests/selectors";

export interface PurchaseButtonProps extends CoreButtonPublicProps {
  children: ReactNode;
  icon?: SVGAsset;
  price: string;
  priceTestSelectors?: DataTestSelectorProps;
}

export const ScPurchaseButtonPrice = styled.div<{
  disabled: boolean | undefined;
}>`
  background-color: ${(props) =>
    !props.disabled && themeTokenRule("color-background-button-purchase")};
  padding-left: ${staticTokenRule("button-padding-x")};
  padding-right: ${staticTokenRule("button-padding-x")};
  display: flex;
  align-items: center;
  align-self: stretch;
`;

const PurchaseButton: ForwardRefRenderFunction<
  HTMLElement,
  PurchaseButtonProps
> = ({ children, icon, price, priceTestSelectors, ...buttonProps }, ref) => {
  return (
    <CoreButton
      {...buttonProps}
      variant={CoreButtonType.Primary}
      ref={ref}
      className="tw-purchase-button"
    >
      <CoreButtonLabel
        icon={icon}
        size={buttonProps.size}
        fullWidth={buttonProps.fullWidth}
        labelAlign={JustifyContent.Center}
      >
        {children}
      </CoreButtonLabel>
      <ScPurchaseButtonPrice
        data-a-target={TEST_AUTOMATION_SELECTORS.ButtonNumBlock}
        {...priceTestSelectors}
        disabled={buttonProps.disabled}
      >
        {price}
      </ScPurchaseButtonPrice>
    </CoreButton>
  );
};

PurchaseButton.displayName = "PurchaseButton";
const ComponentWithRef = forwardRef(PurchaseButton);
export { ComponentWithRef as PurchaseButton };
