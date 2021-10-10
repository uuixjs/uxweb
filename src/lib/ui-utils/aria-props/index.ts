// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getAriaProps(props: any) {
  const ariaProps: Record<string, {}> = {};

  Object.keys(props).forEach((key) => {
    if (key.startsWith("aria") || key === "role") {
      ariaProps[key] = props[key];
    }
  });

  return ariaProps;
}
