import { setupShallowTest } from "../../../tests/helpers";
import { AccordionHeader, AccordionHeaderProps } from "./component";

function getRequiredProps(): AccordionHeaderProps {
  return {
    title: "The standard Lorem Ipsum passage",
  };
}

function getOptionalProps(): AccordionHeaderProps {
  return {
    index: 1,
    title: "The standard Lorem Ipsum passage",
    description: "Used since the 1500s",
    isOpen: true,
    imageProps: {
      src: "https://placehold.jp/6441a4/ffffff/100x100.jpg",
      alt: "Image alt label",
    },
    backgroundImageProps: {
      src: "https://placehold.jp/6441a4/ffffff/500x50.jpg",
      alt: "Background image alt label",
    },
    imageLabelOverlay: "$5",
    label: "Some Label",
  };
}

const setupShallow = setupShallowTest(AccordionHeader, getRequiredProps);

describe("AccordionHeader", () => {
  it("renders AccordionHeader component with only required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders AccordionHeader component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
