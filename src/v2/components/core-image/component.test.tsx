import { setupShallowTest } from "../../tests/helpers";
import { CoreImage, CoreImageProps } from "./component";

function getRequiredProps(): CoreImageProps {
  return {
    src: "testSrc",
    alt: "Test alt",
  };
}

function getOptionalProps(): CoreImageProps {
  return {
    src: "testSrc",
    alt: "Test alt",
    title: "Some test title",
    srcSet: {
      "1x": "https://placehold.jp/6441a4/ffffff/200x100.jpg?text=1x",
      "1.5x": "https://placehold.jp/6441a4/ffffff/300x150.jpg?text=1.5x",
      "2x": "https://placehold.jp/6441a4/ffffff/400x200.jpg?text=2x",
      "3x": "https://placehold.jp/6441a4/ffffff/600x300.jpg?text=3x",
      "4x": "https://placehold.jp/6441a4/ffffff/800x400.jpg?text=4x",
    },
    sizes: [
      { size: "400px", mediaCondition: "(min-width: 400px)" },
      { size: "100vw" },
    ],
    onError: jest.fn(),
    onLoad: jest.fn(),
  };
}

const setupShallow = setupShallowTest(CoreImage, getRequiredProps);
describe("CoreImage", () => {
  it("renders core image component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core image component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders with strings for srcSet and sizes", () => {
    const srcSetString =
      "/files/16870/new-york-skyline-wide.jpg 3724w, /files/16869/new-york-skyline-4by3.jpg 1961w, /files/16871/new-york-skyline-tall.jpg 1060w";
    const sizesString =
      "((min-width: 50em) and (max-width: 60em)) 50em, ((min-width: 30em) and (max-width: 50em)) 30em, (max-width: 30em) 20em";

    const { wrapper } = setupShallow({
      alt: "Test alt",
      title: "Some test title",
      src: "/files/16870/new-york-skyline-wide.jpg",
      srcSet: srcSetString,
      sizes: sizesString,
      onError: jest.fn(),
      onLoad: jest.fn(),
    });

    expect(wrapper.find("img").prop("srcSet")).toBe(srcSetString);
    expect(wrapper.find("img").prop("sizes")).toBe(sizesString);
  });

  it("renders with objects for srcSet and sizes", () => {
    const { wrapper } = setupShallow({
      srcSet: {
        "1x": "photo-200x100.jpg",
        "2x": "photo-400x200.jpg",
      },
      sizes: [
        { size: "400px", mediaCondition: "(min-width: 400px)" },
        { size: "100vw" },
      ],
    });

    expect(wrapper.find("img").prop("srcSet")).toBe(
      "photo-200x100.jpg 1x,photo-400x200.jpg 2x",
    );
    expect(wrapper.find("img").prop("sizes")).toBe(
      "(min-width: 400px) 400px,100vw",
    );
  });

  it("sets src attribute as sizes > srcSet > src", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    const imageProps = wrapper.find("img").props();

    let foundSrc = false;
    let foundSrcSet = false;

    Object.keys(imageProps).forEach((key) => {
      if (key === "src") {
        foundSrc = true;
      }

      if (key === "srcSet") {
        foundSrcSet = true;
        expect(foundSrc).toEqual(false);
      }

      if (key === "sizes") {
        expect(foundSrc).toEqual(false);
        expect(foundSrcSet).toEqual(false);
      }
    });
  });
});
