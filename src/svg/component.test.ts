import { SVG, SVGAsset, SVGType } from ".";

import { createMountWrapperFactory } from "lib/test-utils";

describe("SVG", () => { // @ts-ignore
  const setup = createMountWrapperFactory(SVG, () => ({
    asset: SVGAsset.Gear,
  }));

  it("renders svg component with required props", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders svg component with all props", () => {
    const { wrapper } = setup({
      height: 40,
      width: 40,
      fillParent: true,
      type: SVGType.Alt2,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders svg component with deprecated props", () => {
    const { wrapper } = setup({
      fill: true,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
