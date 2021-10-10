import { setupShallowTest } from "../../../tests/helpers";
import { AccordionBody, AccordionBodyProps } from "./component";

function getOptionalProps(): AccordionBodyProps {
  return {
    children: "Hello World",
    isOpen: true,
  };
}

const setupShallow = setupShallowTest(AccordionBody);

describe("AccordionBody", () => {
  it("renders AccordionBody component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders AccordionBody component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
