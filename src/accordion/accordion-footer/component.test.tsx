import { setupShallowTest } from "../../../tests/helpers";
import { AccordionFooter, AccordionFooterProps } from "./component";

function getRequiredProps(): AccordionFooterProps {
  return {
    primaryButtonProps: {
      children: "Click Me First",
      linkTo: "https://www.twitch.tv/primary",
    },
  };
}

function getOptionalProps(): AccordionFooterProps {
  return {
    primaryButtonProps: {
      children: "Click Me First",
      linkTo: "https://www.twitch.tv/primary",
    },
    secondaryButtonProps: {
      children: "Click Me Second",
      linkTo: "https://www.twitch.tv/secondary",
    },
  };
}

const setupShallow = setupShallowTest(AccordionFooter, getRequiredProps);

describe("AccordionFooter", () => {
  it("renders AccordionFooter component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders AccordionFooter component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
