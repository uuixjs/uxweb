import { setupShallowTest } from "../../../../tests/helpers";
import { AspectRatio } from "../../../aspect";
import { SVGAsset } from "../../../svg";
import { DropDownMenuItemFigure } from "./component";

const setupShallow = setupShallowTest(DropDownMenuItemFigure);

describe("DropDownMenuItem", () => {
  it("renders drop down menu figure as an image", () => {
    const { wrapper } = setupShallow({
      aspectRatio: AspectRatio.Aspect1x1,
      src: "//path/to/img.jpg",
      alt: "image alt",
      icon: SVGAsset.NavGames,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu figure as an icon", () => {
    const { wrapper } = setupShallow({
      icon: SVGAsset.NavGames,
    });
    expect(wrapper).toMatchSnapshot();
  });
});
