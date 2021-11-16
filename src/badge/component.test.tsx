import { setupShallowTest } from "../../tests/helpers";
import { SVGAsset } from "../svg";
import { Badge, BadgeProps, BadgeType } from "./component";

const BADGE_SIZE = 50;

function getRequiredProps(): BadgeProps {
  return {
    icon: SVGAsset.Gear,
  };
}

function getOptionalProps(): BadgeProps {
  return {
    border: true,
    icon: SVGAsset.Gear,
    type: BadgeType.Notification,
    size: BADGE_SIZE,
  };
}

const setupShallow = setupShallowTest(Badge, getRequiredProps);

describe("Badge", () => {
  it("renders badge component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders badge component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
