import { setupShallowTest } from "../../../tests/helpers";
import { Button } from "../../button/button";
import { Background } from "../../layout";
import { NumberBadge, NumberBadgeProps } from "./component";

function getRequiredProps(): NumberBadgeProps {
  return {
    value: 1,
  };
}

function getOptionalProps(): NumberBadgeProps {
  return {
    mask: Background.Base,
    children: <Button>Test</Button>,
    value: 1,
  };
}

const setupShallow = setupShallowTest(NumberBadge, getRequiredProps);

describe("NumberBadge", () => {
  it("renders number badge component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders number badge component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
