import { setupShallowTest } from "../../../../tests/helpers";
import { PopoverBody, PopoverBodyProps } from "./component";

function getRequiredProps(): PopoverBodyProps {
  return {
    popoverId: "test-popover-id",
  };
}

function getOptionalProps(): PopoverBodyProps {
  return {
    popoverId: "test-popover-id",
    children: "Test Content",
    padding: 0,
  };
}

const setupShallow = setupShallowTest(PopoverBody, getRequiredProps);

describe("PopoverBody", () => {
  it("renders popover body component with the required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders popover body component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
