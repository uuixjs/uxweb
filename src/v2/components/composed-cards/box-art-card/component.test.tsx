import { setupShallowTest } from "../../../tests/helpers";
import { BoxArtCard, BoxArtCardProps } from "./component";

function getRequiredProps(): BoxArtCardProps {
  return {
    info: "test sting",
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
  };
}

function getPlaceholderProps(): BoxArtCardProps {
  return {
    info: "test sting",
    placeholder: true,
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
  };
}

function getOptionalProps(): BoxArtCardProps {
  return {
    info: "test sting",
    linkTo: "/",
    title: "Test title",
    src: "srcURL",
    alt: "Test Alt",
    disabled: true,
    unavailable: true,
    tags: [
      {
        label: "Tag One",
      },
      {
        label: "Tag Two",
      },
    ],
  };
}

const setupShallow = setupShallowTest(BoxArtCard, getRequiredProps);
describe("BoxArtCard", () => {
  it("renders box art card component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders box art card component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders box art card component as a placeholder", () => {
    const { wrapper } = setupShallow(getPlaceholderProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("has data-a-target on the title", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('[data-test-selector="tw-card-title"]')).toHaveProp(
      "data-a-target",
      "tw-card-title",
    );
  });

  it("has a data-a-target on the image", () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('[data-test-selector="tw-card-image"]')).toHaveProp(
      "data-a-target",
      "tw-card-image",
    );
  });
});
