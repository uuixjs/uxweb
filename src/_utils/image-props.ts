import { CoreImageProps } from "../core-image";

const PROP_KEYS = new Set([
  "alt",
  "src",
  "srcSet",
  "sizes",
  "onError",
  "onLoad",
  "refHandler",
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageProps(props: any): CoreImageProps {
  const dataProps: { [key: string]: {} } = {};
  for (const key of Object.keys(props)) {
    if (PROP_KEYS.has(key)) {
      dataProps[key] = props[key];
    }
  }

  return (dataProps as {}) as CoreImageProps;
}
