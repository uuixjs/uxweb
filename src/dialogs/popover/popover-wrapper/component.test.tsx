import { setupShallowTest } from "../../../../tests/helpers";
import { Background } from "../../../layout";
import { BalloonSize } from "../../balloon/balloon-wrapper";
import { PopoverWrapper, PopoverWrapperProps } from "./component";

function getRequiredProps(): PopoverWrapperProps {
  return {
    popoverId: "test-popover-id",
  };
}

function getOptionalProps(): PopoverWrapperProps {
  return {
    popoverId: "test-popover-id",
    elevation: 1,
    maxHeight: "50rem",
    size: BalloonSize.Large,
    children: "Test Child",
    background: Background.Alt2,
  };
}

const setupShallow = setupShallowTest(PopoverWrapper, getRequiredProps);

describe("Popover", () => {
  it("renders popover component with the required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders popover component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
