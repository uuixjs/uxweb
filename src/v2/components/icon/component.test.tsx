import { createMountWrapperFactory } from "tachyon-test-utils";
import { SVGAsset } from "../svg";
import {
  DEFAULT_ICON_SIZE_REM,
  Icon,
  ScIconLayout,
  ScIconSVG,
} from "./component";

describe(Icon, () => {
  const setup = createMountWrapperFactory(Icon, () => ({
    asset: SVGAsset.Heart,
  }));

  it("renders an Icon component with required props", () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders an Icon component with all props", () => {
    const { wrapper } = setup({
      fillParent: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders an Icon component with deprecated fill prop", () => {
    const { wrapper } = setup({
      fill: true,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("sets container size to default rems without fill prop", () => {
    const { wrapper } = setup();
    const iconLayout = wrapper.find(ScIconLayout).find("div").first();
    expect(iconLayout).toHaveStyleRule("height", `${DEFAULT_ICON_SIZE_REM}rem`);
    expect(iconLayout).toHaveStyleRule("width", `${DEFAULT_ICON_SIZE_REM}rem`);
  });

  it("sets container size to 100% with fill prop", () => {
    const { wrapper } = setup({ fill: true });
    const iconLayout = wrapper.find(ScIconLayout).find("div").first();
    expect(iconLayout).toHaveStyleRule("height", "100%");
    expect(iconLayout).toHaveStyleRule("width", "100%");
  });

  it("sets SVG fill to currentColor", () => {
    const { wrapper } = setup();
    expect(wrapper.find(ScIconSVG)).toHaveStyleRule("fill", "currentColor");
  });
});
