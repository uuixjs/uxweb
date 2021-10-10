import { Background, BorderRadiusProps, Display, Layout } from "../../layout";
import { FC, ReactNode } from "react";

import { getAriaProps } from "lib";

export interface AccordionBodyProps {
  /**
   * @example Lorem ipsum dolor sit amet, consectetur adipiscing elit
   */
  children?: ReactNode;
  /**
   * @example true
   */
  isOpen?: boolean;
  borderRadius?: BorderRadiusProps;
}

/**
 * AccordionBody is a content region whose visibility should be
 * controlled by an AccordionHeader
 */
export const AccordionBody: FC<AccordionBodyProps> = (props) => (
  <Layout
    padding={2}
    background={Background.Base}
    elevation={1}
    display={props.isOpen ? Display.Block : Display.Hide}
    borderRadius={props.borderRadius}
    {...getAriaProps(props)}
  >
    {props.children}
  </Layout>
);

AccordionBody.displayName = "AccordionBody";
