import { createMountWrapperFactory } from "tachyon-test-utils";
import { AnimatedNumber, ScAnimatedNumber } from "./component";

describe("AnimatedNumber", () => {
  const setup = createMountWrapperFactory(AnimatedNumber, () => ({
    value: 123,
    formatValue: (n) => n.toLocaleString(),
    monospaced: false,
  }));

  it("renders AnimatedNumber component", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with monospaced rules", () => {
    const { wrapper } = setup({
      monospaced: true,
    });
    expect(wrapper.find(ScAnimatedNumber)).toHaveStyleRule(
      "font-feature-settings",
      `"tnum"`,
    );
  });
});
