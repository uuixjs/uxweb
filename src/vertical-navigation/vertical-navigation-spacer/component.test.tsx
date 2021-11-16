import { navItemHeight, VerticalNavigationSpacer } from ".";
import { setupShallowTest } from "../../../tests/helpers";

describe("VerticalNavigationSpacer", () => {
  const setupShallow = setupShallowTest(VerticalNavigationSpacer);

  it("defaults to 1x nav item height", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.prop("style")).toEqual({ height: `${navItemHeight}rem` });
  });

  it("sets correct height for >1 props.items", () => {
    const { wrapper } = setupShallow({
      items: 3,
    });

    expect(wrapper.prop("style")).toEqual({
      height: `${navItemHeight * 3}rem`,
    });
  });
});
