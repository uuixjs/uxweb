import { setupShallowTest } from "../../../tests/helpers";
import { ThumbnailCard, ThumbnailCardProps } from "./component";

function getRequiredProps(): ThumbnailCardProps {
  return {
    info: "test sting",
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
  };
}

function getPlaceholderProps(): ThumbnailCardProps {
  return {
    info: "test sting",
    placeholder: true,
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
  };
}

function getOptionalProps(): ThumbnailCardProps {
  return {
    info: "test sting",
    linkTo: "/",
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
  };
}

const setupShallow = setupShallowTest(ThumbnailCard, getRequiredProps);
describe("ThumbnailCard", () => {
  it("renders thumbnail card component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders thumbnail component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders thumbnail component as a placeholder", () => {
    const { wrapper } = setupShallow(getPlaceholderProps());
    expect(wrapper).toMatchSnapshot();
  });
});
