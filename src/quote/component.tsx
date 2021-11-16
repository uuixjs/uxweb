import { FC, ReactNode } from "react";
import {
  Padding,
  formatColor,
  staticTokenRule,
  styled,
  themeTokenRule,
} from "@uuixjs/uuixweb-lib";

import { Layout } from "../layout";

export interface QuoteProps {
  children: ReactNode;
  padding?: Padding;
  color?: string | null;
}

interface ScQuoteProps {
  $color?: QuoteProps["color"];
}

const ScQuote = styled(Layout)<ScQuoteProps>`
  border-left-width: ${staticTokenRule("border-width-marked")};
  border-left-style: solid;
  position: relative;

  border-left-color: ${(props) =>
    props.$color
      ? formatColor(props.$color)
      : themeTokenRule("color-border-quote")};
`;

export const Quote: FC<QuoteProps> = ({ color, padding, ...props }) => {
  return (
    <ScQuote
      {...props}
      padding={padding !== undefined ? padding : { left: 0.5 }}
      $color={color}
      className="tw-quote"
    >
      {props.children}
    </ScQuote>
  );
};

Quote.displayName = "Quote";
