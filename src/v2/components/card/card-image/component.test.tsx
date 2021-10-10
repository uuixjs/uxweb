import { setupShallowTest } from "../../../tests/helpers";
import { AspectRatio } from "../../aspect";
import { CardImage, CardImageProps, CardImageSize } from "./component";

function getRequiredProps(): CardImageProps {
  return {
    alt: "Text image alt",
    src: "testSrc",
  };
}

function getOptionalProps(): CardImageProps {
  return {
    alt: "Text image alt",
    src: "testSrc",
    aspect: AspectRatio.Aspect21x9,
    size: CardImageSize.Size3,
    overflow: true,
  };
}

const setupShallow = setupShallowTest(CardImage, getRequiredProps);
describe("CardImage", () => {
  it("renders card image component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders card image component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });
});
