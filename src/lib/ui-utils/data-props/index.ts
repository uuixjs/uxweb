/**
 * Ordinarily, hyphenated data attributes on JSX elements will all be ignored by typescript.
 * This interface can be used to explicitly define some known data props that are frequently
 * used by consumer projects.
 *
 * We only need to explicitly define this if a components props are going to be passed in as
 * a javascript object instead of being rendered as JSX.
 *
 * TODO: Consider refactoring to allow any `data-` attribute if regex validated types is released:
 * https://github.com/Microsoft/TypeScript/issues/6579
 */
export interface DataTestSelectorProps {
  /** Data attribute which can be used for unit test selectors */
  ["data-test-selector"]?: string;
  /** Data attribute which can be used for automation test selectors */
  ["data-a-target"]?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDataProps(props: any) {
  const { dataProps } = splitDataProps(props);
  return dataProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omitDataProps(props: { [key: string]: any }) {
  const { nonDataProps } = splitDataProps(props);
  return nonDataProps;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function splitDataProps(props: { [key: string]: any }) {
  const dataProps: Record<string, {}> = {};
  const nonDataProps: Record<string, {}> = {};

  for (const key of Object.keys(props)) {
    if (key.startsWith("data-")) {
      dataProps[key] = props[key];
    } else {
      nonDataProps[key] = props[key];
    }
  }

  return {
    dataProps,
    nonDataProps,
  };
}
