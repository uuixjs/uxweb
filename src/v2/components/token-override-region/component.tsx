import { ComponentType, FC } from "react";
import {
  ThemeProvider,
  ThemeProviderProps,
  styled,
} from "lib/ui-utils";

import { ThemeContextValue } from "lib/utils-styled-components";

interface TokenOverrideRegionProps {
  tokenOverrides?: ThemeContextValue["tokenOverrides"];
  cssVars?: ThemeProviderProps["cssVars"];
}

export const ScTokenOverrideCSSVars = styled.div<TokenOverrideRegionProps>(
  (props) => {
    if (!props.theme) {
      return;
    }

    const { cssVars, tokenOverrides } = props.theme;

    if (!cssVars || !tokenOverrides) {
      return;
    }

    return Object.entries(tokenOverrides).map(
      ([token, value]) => `--${token}: ${value};`,
    );
  },
);

export const TokenOverrideRegion: FC<TokenOverrideRegionProps> = ({
  tokenOverrides,
  cssVars,
  children,
}) => {
  return (
    <ThemeProvider tokenOverrides={tokenOverrides} cssVars={cssVars}>
      <ScTokenOverrideCSSVars>{children}</ScTokenOverrideCSSVars>
    </ThemeProvider>
  );
};

export const withTokenOverrides = <P extends {}>(
  Component: ComponentType<P>,
  overrideProps: TokenOverrideRegionProps,
): ComponentType<P> => (props) => (
  <TokenOverrideRegion {...overrideProps}>
    <Component {...(props as P)} />
  </TokenOverrideRegion>
);
