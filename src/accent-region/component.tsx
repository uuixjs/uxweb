import {
  AccentToken,
  AccentTokenValues,
  accentTokenDarkThemeMap,
  accentTokenLightThemeMap,
  formatAccentTokenCssVars,
  formatTokenOverrides,
} from "./token-map";
import { RGBColor, parse, rgb2hex } from "lib/pure-color";
import {
  ThemeContextValue,
  accentColorGenerator,
  colorIsDark,
  formatColor,
  getHoverColor,
  styled,
  useTheme,
} from "@uuixjs/uuixweb-lib";

import { FC } from "react";
import { StaticTokenMap } from "lib/ui-tokens";
import { TokenOverrideRegion } from "../token-override-region";

export interface AccentRegionProps {
  /** The original chosen color */
  inputColor?: string | null;
  /** Set to true if the contrast ratio between the original color and `#FFFFFF` is less than 4.5 */
  inputColorIsDark?: boolean | null;
  /** Color generated according to hover color spec */
  inputColorHover?: string | null;
  /** Color generated according to `accentColorGenerator` spec */
  primary1?: string | null;
  /** Color generated according to `accentColorGenerator` spec */
  primary2?: string | null;
  /** Color generated according to `accentColorGenerator` spec */
  primary3?: string | null;
  /** Color generated according to `accentColorGenerator` spec */
  primary4?: string | null;
  /** Color generated according to `accentColorGenerator` spec */
  primary5?: string | null;
}

export const ScAccentRegionCssVars = styled.div<{ $values: AccentTokenValues }>`
  /** Accent Token CSS Vars: */
  ${({ $values }) => formatAccentTokenCssVars($values)}
`;

/**
 * Changes the color palette for a region of the page
 * and should be populated with values which have been generated
 * according to the Core UI accent color generator spec.
 *
 * Values may be generated and stored on the server, or can be generated
 * at render time by using the functions provided in the Core UI package.
 */
export const AccentRegion: FC<AccentRegionProps> = ({
  inputColor,
  inputColorIsDark,
  inputColorHover,
  primary1,
  primary2,
  primary3,
  primary4,
  primary5,
  children,
}) => {
  const tokenValues: AccentTokenValues = {};

  if (inputColor) {
    tokenValues[AccentToken.Accent] = formatColor(inputColor);
  }

  if (typeof inputColorIsDark === "boolean") {
    tokenValues[AccentToken.AccentLabel] = inputColorIsDark
      ? "#FFFFFF"
      : "#000000";
  }

  if (inputColorHover) {
    tokenValues[AccentToken.Hover] = formatColor(inputColorHover);
  }

  if (typeof inputColorIsDark === "boolean") {
    tokenValues[AccentToken.BackgroundButtonPurchase] = inputColorIsDark
      ? StaticTokenMap["color-opac-b-5"]
      : StaticTokenMap["color-opac-w-5"];
  }

  if (primary1) {
    tokenValues[AccentToken.Primary1] = formatColor(primary1);
  }

  if (primary2) {
    tokenValues[AccentToken.Primary2] = formatColor(primary2);
  }

  if (primary3) {
    tokenValues[AccentToken.Primary3] = formatColor(primary3);
  }

  if (primary4) {
    tokenValues[AccentToken.Primary4] = formatColor(primary4);
  }

  if (primary5) {
    tokenValues[AccentToken.Primary5] = formatColor(primary5);
  }

  const theme = useTheme();
  let tokenOverrides: ThemeContextValue["tokenOverrides"];

  if (theme === undefined || theme.name === "dark") {
    tokenOverrides = formatTokenOverrides(tokenValues, accentTokenDarkThemeMap);
  } else if (theme.name === "light") {
    tokenOverrides = formatTokenOverrides(
      tokenValues,
      accentTokenLightThemeMap,
    );
  }

  return (
    <TokenOverrideRegion tokenOverrides={tokenOverrides}>
      <ScAccentRegionCssVars $values={tokenValues}>
        {children}
      </ScAccentRegionCssVars>
    </TokenOverrideRegion>
  );
};

export function generateAccentRegionProps(
  color: string | null,
): AccentRegionProps {
  const rgb = color && (parse(formatColor(color)) as RGBColor);

  if (!rgb) {
    return {
      inputColor: null,
      inputColorIsDark: false,
      inputColorHover: null,
      primary1: null,
      primary2: null,
      primary3: null,
      primary4: null,
      primary5: null,
    };
  }

  const colors = accentColorGenerator(rgb).map((v) => rgb2hex(v));

  return {
    inputColor: rgb2hex(rgb),
    inputColorIsDark: colorIsDark(rgb),
    inputColorHover: rgb2hex(getHoverColor(rgb)),
    primary1: colors[0],
    primary2: colors[1],
    primary3: colors[2],
    primary4: colors[3],
    primary5: colors[4],
  };
}
