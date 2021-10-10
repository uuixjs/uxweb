import { Button, ButtonProps, ButtonType } from "../../button/button";
import { Display, JustifyContent, Layout } from "../../layout";

import { FC } from "react";
import { getAriaProps } from "lib/ui-utils";

export interface AccordionFooterProps {
  primaryButtonProps: ButtonProps;
  secondaryButtonProps?: ButtonProps;
}

/**
 * AccordionFooter should be placed within an AccordionBody and
 * composes either one or two call-to-action buttons with consistent placement.
 */
export const AccordionFooter: FC<AccordionFooterProps> = (props) => {
  const primaryButton = (
    // Order of attributes matters; later props will override earlier props
    <Button {...props.primaryButtonProps} variant={ButtonType.Primary} />
  );

  let secondaryButton;

  if (props.secondaryButtonProps) {
    secondaryButton = (
      // Order of attributes matters; later props will override earlier props
      <Button {...props.secondaryButtonProps} variant={ButtonType.Secondary} />
    );
  }

  return (
    <Layout
      display={Display.Flex}
      justifyContent={JustifyContent.End}
      margin={{ top: 2 }}
      {...getAriaProps(props)}
    >
      {secondaryButton && (
        <Layout margin={{ left: 1 }}>{secondaryButton}</Layout>
      )}

      <Layout margin={{ left: 1 }}>{primaryButton}</Layout>
    </Layout>
  );
};

AccordionFooter.displayName = "AccordionFooter";
