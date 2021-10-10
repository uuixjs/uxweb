import { StaticTokenMap } from "lib/ui-tokens";
// eslint-disable-next-line no-restricted-imports
import { rem as toRem } from "polished";

export const BASE_REM_UNIT = StaticTokenMap["base-rem-unit"];

/**
 * Convert pixel value to rems.
 *
 * @param pxval The number of pixels to convert to rems. e.g. "16px" or 16
 * @returns converted rem value e.g. "1.6rem"
 */
export function rem(pxval: string | number): string {
  return toRem(pxval, BASE_REM_UNIT);
}
