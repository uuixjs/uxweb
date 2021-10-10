import { AtRule } from "csstype";
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */
import { createGlobalStyle } from "lib";

/* stylelint-disable */

/**
 * Temporary shim to support older versions of url-loader.
 *
 * When not configured to load ESModules, this will deal with
 * handling loading the asset as either ESModules or CommonJS.
 *
 * This can be removed when we are ready to drop support for
 * older url-loaders and require projects to update their
 * configurations for asset loading.
 *
 * example: Core UI storybook is outdated and has this problem.
 */
function getModuleExport(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mod: any,
) {
  return mod;
  // return mod && mod.__esModule ? mod.default : mod;
}

/**
 * Creates a CSS string with font declarations which can be used
 * either in Styled Components, or rendered directly inside of a
 * `<style>` tag in the document head.
 *
 * Enables projects to implement different optimization patterns.
 */
export function getFontDeclarationString(fontDisplay?: AtRule.FontDisplay) {
  const fontDisplayValue = fontDisplay ? `font-display:${fontDisplay};` : "";

  return `
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-vietnamese-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-400-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-400-normal.woff"),
  )}') format('woff');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-vietnamese-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-600-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-600-normal.woff"),
  )}') format('woff');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-cyrillic-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-cyrillic-ext-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0370-03FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-greek-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-greek-ext-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+1F00-1FFF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-latin-ext-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-latin-ext-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("@fontsource/inter/files/inter-vietnamese-variable-wghtOnly-normal.woff2"),
    )}') format('woff2-variations'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-700-normal.woff2"),
  )}') format('woff2'), url('${getModuleExport(
    require("@fontsource/inter/files/inter-vietnamese-700-normal.woff"),
  )}') format('woff');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Roobert';
    font-style: normal;
    font-weight: 400;
    src: url('${getModuleExport(
      require("lib/fonts/fonts/web/roobert/Roobert-Regular.woff2"),
    )}') format('woff2'), url('${getModuleExport(
    require("lib/fonts/fonts/web/roobert/Roobert-Regular.woff"),
  )}') format('woff');
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Roobert';
    font-style: normal;
    font-weight: 600;
    src: url('${getModuleExport(
      require("lib/fonts/fonts/web/roobert/Roobert-SemiBold.woff2"),
    )}') format('woff2'), url('${getModuleExport(
    require("lib/fonts/fonts/web/roobert/Roobert-SemiBold.woff"),
  )}') format('woff');
  }
  @font-face {
    ${fontDisplayValue}
    font-family: 'Roobert';
    font-style: normal;
    font-weight: 700;
    src: url('${getModuleExport(
      require("lib/fonts/fonts/web/roobert/Roobert-Bold.woff2"),
    )}') format('woff2'), url('${getModuleExport(
    require("lib/fonts/fonts/web/roobert/Roobert-Bold.woff"),
  )}') format('woff');
  `;
}

export interface ScFontDeclarationProps {
  fontDisplay?: AtRule.FontDisplay;
}

export const ScFontDeclaration = createGlobalStyle<ScFontDeclarationProps>(
  (props: ScFontDeclarationProps) =>
    getFontDeclarationString(props.fontDisplay),
);

ScFontDeclaration.displayName = "ScFontDeclaration";
