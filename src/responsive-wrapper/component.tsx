import { StaticToken, StaticTokenMap } from "lib/ui-tokens";
import { css, styled } from "@uuixjs/uuixweb-lib";

import { ReactNode } from "react";

export interface ResponsiveWrapperProps {
  centered?: boolean;
  /**
   * @example
   * <Layout color={Color.Overlay} textAlign={TextAlign.Center} background={Background.Accent} padding={2}>Inspect my container to see my max-width</Layout>
   */
  children: ReactNode;
}

const breakpoints: StaticToken[] = [
  "break-xs",
  "break-sm",
  "break-md",
  "break-lg",
  "break-xl",
  "break-xxl",
];

export const ResponsiveWrapper = styled.div.attrs({
  className: "tw-responsive-wrapper",
})<ResponsiveWrapperProps>`
  width: 100%;

  ${({ centered }) =>
    centered &&
    css`
      margin-right: auto;
      margin-left: auto;
    `}

  ${breakpoints.map(
    (bp) => css`
      @media screen and (min-width: ${StaticTokenMap[bp]}) {
        max-width: ${StaticTokenMap[bp]};
      }
    `,
  )}
`;
