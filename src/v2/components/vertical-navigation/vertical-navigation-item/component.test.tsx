import { setupShallowTest } from "../../../tests/helpers";
import { SVGAsset } from "../../svg";
import { VerticalNavigationItem } from "./component";

describe("VerticalNavigationItem", () => {
  const setupShallow = setupShallowTest(VerticalNavigationItem);

  it("shows an external link icon", () => {
    const { wrapper } = setupShallow({
      externalLink: true,
    });

    expect(wrapper.shallow().find("Icon")).toHaveProp("asset", SVGAsset.Popout);
  });
});
