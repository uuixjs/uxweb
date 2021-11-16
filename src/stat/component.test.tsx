import { setupShallowTest } from "../../tests/helpers";
import {
  TooltipAlign,
  TooltipDirection,
} from "../dialogs/tooltip/attached-tooltip";
import { SVGAsset } from "../svg";
import { Stat, StatProps } from "./component";

function getRequiredProps(): StatProps {
  return {
    label: "Test label",
    value: "Test value",
    icon: SVGAsset.Gear,
  };
}

function getOptionalProps(): StatProps {
  return {
    label: "Test label",
    value: "Test value",
    icon: SVGAsset.Gear,
    tooltipDirection: TooltipDirection.Left,
    tooltipAlign: TooltipAlign.Right,
  };
}

const setupShallow = setupShallowTest(Stat);

describe("Stat", () => {
  it("renders stat component with required props", () => {
    const { wrapper } = setupShallow(getRequiredProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders stat component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
