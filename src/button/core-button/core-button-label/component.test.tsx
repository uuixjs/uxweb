import { setupShallowTest } from "../../../../tests/helpers";
import { SVGAsset } from "../../../svg";
import { CoreButtonSize } from "../component";
import { CoreButtonLabel, CoreButtonLabelProps } from "./component";

function getOptionalProps(): CoreButtonLabelProps {
  return {
    children: "Test Button",
    dropdown: true,
    icon: SVGAsset.Gear,
    size: CoreButtonSize.Large,
  };
}

const setupShallow = setupShallowTest(CoreButtonLabel);
describe("CoreButtonLabel", () => {
  it("renders CoreButtonLabel component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
