import { setupShallowTest } from "../../../../tests/helpers";
import { PopoverTitleComponent, PopoverTitleProps } from "./component";

function getRequiredProps(): PopoverTitleProps {
  return {
    title: "Title",
  };
}

function getOptionalProps(): PopoverTitleProps {
  return {
    title: "Title",
    subtitle: "SubTitle",
  };
}

const setupShallow = setupShallowTest(PopoverTitleComponent, getRequiredProps);

describe("PopoverHeader", () => {
  it("renders Popover header component", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders Popover header component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
