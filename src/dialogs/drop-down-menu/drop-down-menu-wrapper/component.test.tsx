import { mount } from "enzyme";
import { setupShallowTest } from "../../../../tests/helpers";
import { CheckBox } from "../../../form/checkbox";
import { Radio } from "../../../form/radio";
import { Background } from "../../../layout";
import { BalloonSize } from "../../balloon/balloon-wrapper";
import { DropDownMenuInputItemType } from "../drop-down-menu-input-item";
import { DropDownMenuWrapper, DropDownMenuWrapperProps } from "./component";

const items = [
  { title: "Test Item 1" },
  { title: "Test Item 2" },
  { title: "Test Item 3" },
];

function getRequiredProps(): DropDownMenuWrapperProps {
  return {
    items,
  };
}

function getOptionalProps(): DropDownMenuWrapperProps {
  return {
    items,
    elevation: 1,
    maxHeight: "50vh",
    size: BalloonSize.Large,
    background: Background.Alt2,
  };
}

const setupShallow = setupShallowTest(DropDownMenuWrapper, getRequiredProps);

describe("DropDownMenu", () => {
  it("renders drop down menu component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders drop down menu component with checkboxes ", () => {
    const wrapper = mount(
      <DropDownMenuWrapper
        items={[
          { type: DropDownMenuInputItemType.CheckBox, label: "Checkbox 1" },
          { type: DropDownMenuInputItemType.CheckBox, label: "Checkbox 2" },
          { type: DropDownMenuInputItemType.CheckBox, label: "Checkbox 3" },
        ]}
      />,
    );

    expect(wrapper.find(CheckBox)).toHaveLength(3);
  });

  it("renders drop down menu component with radios ", () => {
    const wrapper = mount(
      <DropDownMenuWrapper
        items={[
          { type: DropDownMenuInputItemType.Radio, label: "Radio 1" },
          { type: DropDownMenuInputItemType.Radio, label: "Radio 2" },
        ]}
      />,
    );

    expect(wrapper.find(Radio)).toHaveLength(2);
  });
});
