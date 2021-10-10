import {
  ScTower,
  ScTowerPlaceholder,
  Tower,
  TowerChildWidth,
  TowerGutter,
  TowerProps,
  gutterWidthMap,
} from "./component";

import { createMountWrapperFactory } from "tachyon-test-utils";
import { rem } from "lib/ui-utils";
import { setupShallowTest } from "../../tests/helpers";

function getOptionalProps(): TowerProps {
  return {
    center: true,
    childWidth: TowerChildWidth.Medium,
    gutterSize: TowerGutter.ExtraSmall,
    noGrow: true,
    noWrap: true,
    placeholderItems: 10,
  };
}

const setupShallow = setupShallowTest(Tower);
const setupMount = createMountWrapperFactory(Tower);

describe("Tower", () => {
  it("renders tower component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tower component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders tower children of specific size", () => {
    const CHILD_WIDTH = 499;
    const { wrapper } = setupMount({
      childWidth: CHILD_WIDTH,
    });

    expect(wrapper.find(ScTower).find("div")).toHaveStyleRule(
      "width",
      rem(CHILD_WIDTH),
      {
        modifier: "> *",
      },
    );

    expect(wrapper.find(ScTower).find("div")).toHaveStyleRule(
      "flex-grow",
      "1",
      {
        modifier: "> *",
      },
    );
  });

  it("renders tower with gutter widths", () => {
    const GUTTER_SIZE = TowerGutter.Large;
    const { wrapper } = setupMount({
      gutterSize: GUTTER_SIZE,
    });

    expect(wrapper.find(ScTower).find("div")).toHaveStyleRule(
      "padding",
      `0 ${gutterWidthMap[GUTTER_SIZE]}`,
      {
        modifier: "> *",
      },
    );
  });

  it("renders tower placeholders", () => {
    const { wrapper } = setupMount({
      placeholderItems: 99,
    });

    expect(wrapper.find(ScTowerPlaceholder).length).toBe(99);
  });
});
