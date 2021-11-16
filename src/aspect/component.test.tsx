import { createMountWrapperFactory } from "tachyon-test-utils";
import { Align, Aspect, AspectRatio, ScAspectSpacer } from "./component";

describe("Aspect", () => {
  const setup = createMountWrapperFactory(Aspect);

  it("renders apect component", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders apect component with all props", () => {
    const { wrapper } = setup({
      ratio: AspectRatio.Aspect16x9,
      align: Align.Bottom,
      allowOverflow: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders apect component with deprecated overflow prop", () => {
    const { wrapper } = setup({
      overflow: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("accepts enum values and maps to percentages", () => {
    const { wrapper } = setup({
      ratio: AspectRatio.Aspect4x3,
    });
    expect(wrapper.find(ScAspectSpacer)).toHaveStyleRule(
      "padding-bottom",
      "75%",
    );
  });

  it("accepts decimal values and maps to percentages", () => {
    const { wrapper } = setup({
      ratio: 16 / 9,
    });
    expect(wrapper.find(ScAspectSpacer)).toHaveStyleRule(
      "padding-bottom",
      "56.25%",
    );
  });
});
