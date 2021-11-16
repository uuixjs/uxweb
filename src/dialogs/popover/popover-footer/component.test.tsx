import { setupShallowTest } from "../../../../tests/helpers";
import { PopoverFooter, PopoverFooterProps } from "./component";

function getRequiredProps(): PopoverFooterProps {
  return {
    primaryButtonProps: {
      title: "Action",
      onClick: jest.fn(),
    },
  };
}

function getOptionalProps(): PopoverFooterProps {
  return {
    primaryButtonProps: {
      title: "Action",
      onClick: jest.fn(),
    },
    secondaryButtonProps: {
      title: "Cancel",
      onClick: jest.fn(),
    },
  };
}

const setupShallow = setupShallowTest(PopoverFooter, getRequiredProps);

describe("PopoverFooter", () => {
  it("renders Popover footer component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Popover footer component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
