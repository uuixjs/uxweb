import { setupShallowTest } from "../../../tests/helpers";
import { VerticalNavigationGroupHeader } from "./component";

describe("VerticalNavigationItem", () => {
  const setupShallow = setupShallowTest(VerticalNavigationGroupHeader);

  it("renders a ExpandableIndicator", () => {
    const { wrapper } = setupShallow();

    expect(wrapper.shallow().find("ExpandableIndicator")).toHaveLength(1);
  });

  it("sets ExpandableIndicator open/closed state", () => {
    const { wrapper } = setupShallow({
      open: false,
    });

    expect(
      wrapper.shallow().find("ExpandableIndicator").props(),
    ).toHaveProperty("open", false);

    wrapper.setProps({
      open: true,
    });

    expect(
      wrapper.shallow().find("ExpandableIndicator").props(),
    ).toHaveProperty("open", true);
  });
});
