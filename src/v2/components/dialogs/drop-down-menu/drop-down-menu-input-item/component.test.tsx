import { setupShallowTest } from "../../../../tests/helpers";
import { Radio } from "../../../form/radio";
import { Toggle } from "../../../form/toggle";
import { SVGAsset } from "../../../svg";
import {
  DropDownMenuInputItem,
  DropDownMenuInputItemProps,
  DropDownMenuInputItemType,
} from "./component";

function getRequiredProps(): DropDownMenuInputItemProps {
  return {
    type: DropDownMenuInputItemType.CheckBox,
    label: "Test Label",
  };
}

function getOptionalProps(): DropDownMenuInputItemProps {
  return {
    type: DropDownMenuInputItemType.CheckBox,
    label: "Test Label",
    figure: {
      icon: SVGAsset.LogoGlitch,
    },
  };
}

const setupShallow = setupShallowTest(DropDownMenuInputItem, getRequiredProps);

describe("DropDownMenuInputItem", () => {
  it("renders drop down menu input item component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu input item component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu input item component with a radio input", () => {
    const { wrapper } = setupShallow({ type: DropDownMenuInputItemType.Radio });
    expect(wrapper.find(Radio)).toHaveLength(1);
  });

  it("renders drop down menu input item component with a radio input", () => {
    const { wrapper } = setupShallow({
      type: DropDownMenuInputItemType.Toggle,
    });
    expect(wrapper.find(Toggle)).toHaveLength(1);
  });
});
