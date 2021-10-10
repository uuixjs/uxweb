import { shallow } from "enzyme";
import { setupShallowTest } from "../../../../tests/helpers";
import { Icon } from "../../../icon";
import { Interactable, InteractableType } from "../../../interactable";
import { SVGAsset } from "../../../svg";
import { DropDownMenuItemFigure } from "../drop-down-menu-item-figure";
import { DropDownMenuItem, DropDownMenuItemProps } from "./component";

function getRequiredProps(): DropDownMenuItemProps {
  return {
    label: "Test link text",
  };
}

function getOptionalProps(): DropDownMenuItemProps {
  return {
    label: "Test link text",
    title: "Test title attribute",
    figure: {
      icon: SVGAsset.NavGames,
    },
    actionIcon: SVGAsset.AngleRight,
    selected: true,
    value: "EN",
  };
}

const setupShallow = setupShallowTest(DropDownMenuItem, getRequiredProps);

describe("DropDownMenuItem", () => {
  it("renders drop down menu item component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu item component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu item component with an image", () => {
    const { wrapper } = setupShallow({
      figure: {
        alt: "Aatrox avatar",
        src:
          "https://ddragon.leagueoflegends.com/cdn/8.17.1/img/champion/Aatrox.png",
      },
    });
    expect(wrapper.find(DropDownMenuItemFigure)).toHaveLength(1);
  });

  it("renders an SVGAsset.Check when selected with no action icon", () => {
    const { wrapper } = setupShallow({
      selected: true,
      actionIcon: undefined,
    });
    expect(wrapper.find(Icon)).toHaveProp("asset", SVGAsset.Check);
  });

  it("renders the provided icon when selected with an action icon", () => {
    const { wrapper } = setupShallow({
      selected: true,
      actionIcon: SVGAsset.AngleRight,
    });
    expect(wrapper.find(Icon)).toHaveProp("asset", SVGAsset.AngleRight);
  });

  it("renders the provided icon when not selected", () => {
    const { wrapper } = setupShallow({
      selected: false,
      actionIcon: SVGAsset.AngleRight,
    });
    expect(wrapper.find(Icon)).toHaveProp("asset", SVGAsset.AngleRight);
  });

  it("renders no icon when not selected and no action icon provided", () => {
    const { wrapper } = setupShallow({
      selected: false,
      actionIcon: undefined,
    });
    expect(wrapper.find(Icon)).toHaveLength(0);
  });

  it("renders children when provided", () => {
    const wrapper = shallow(
      <DropDownMenuItem>
        <div className="unique" />
      </DropDownMenuItem>,
    );
    expect(wrapper.contains(<div className="unique" />)).toEqual(true);
  });

  it("renders an interactable with interactable type", () => {
    const wrapper = shallow(
      <DropDownMenuItem variant={InteractableType.Alert} />,
    );
    expect(wrapper.find(Interactable).prop("variant")).toBe(
      InteractableType.Alert,
    );
  });
});
