import { AnimatedGlitchLogo } from ".";
import { createMountWrapperFactory } from "lib/test-utils";

describe("AnimatedGlitchLogo", () => {
  const setup = createMountWrapperFactory(AnimatedGlitchLogo);

  it("renders svg component with required props", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders svg component with all props", () => {
    const { wrapper } = setup({
      height: 85,
      width: 57,
      padding: 4,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
