import { setupShallowTest } from "../../../../tests/helpers";
import { SVGAsset } from "../../../svg";
import { CoreButtonSize } from "../component";
import { CoreButtonIcon, CoreButtonIconProps } from "./component";

function getOptionalProps(): CoreButtonIconProps {
  return {
    icon: SVGAsset.Gear,
    size: CoreButtonSize.Large,
  };
}

const setupShallow = setupShallowTest(CoreButtonIcon);
describe("CoreButtonIcon", () => {
  it("renders CoreButtonIcon component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders CoreButtonIcon component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
