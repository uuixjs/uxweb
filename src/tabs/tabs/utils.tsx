import { TabItemPublicProps } from ".";
import { TabItemLabel } from "./components/tab-item";

// Returns true if the UI layout will most likely be the same
export function isTabItemsLayoutEqual(
  a: TabItemPublicProps[],
  b: TabItemPublicProps[],
): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!labelIsEqual(a[i].label, b[i].label)) {
      return false;
    }
  }

  return true;
}

export function labelIsEqual(a?: TabItemLabel, b?: TabItemLabel) {
  if (a === b) {
    return true;
  }

  if (typeof a === "object" && typeof b === "object") {
    return a[0] === b[0] && a[1] === b[1];
  }

  return false;
}
