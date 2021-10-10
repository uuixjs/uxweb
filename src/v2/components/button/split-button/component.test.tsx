import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { SVGAsset } from "../../svg";
import { CoreButton, CoreButtonSize, CoreButtonType } from "../core-button";
import { CoreButtonDropdownType } from "../core-button/core-button-dropdown";
import { SplitButtonComponent, SplitButtonProps } from "./component";

function getRequiredProps(): SplitButtonProps {
  return {
    dropdown: {},
  };
}

function getOptionalProps(): SplitButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    download: "Download all the things",
    dropdown: {
      autoFocus: true,
      "data-a-target": "a-target",
      "data-test-selector": "test-selector",
      disabled: true,
      download: "download",
      linkTo: "https://example.com",
      onClick: jest.fn(),
      tabIndex: 1,
      targetBlank: true,
      title: "Test title",
      type: CoreButtonDropdownType.ArrowUp,
    },
    fullWidth: true,
    icon: SVGAsset.Gear,
    linkTo: "/",
    onClick: jest.fn(),
    overlay: true,
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    type: CoreButtonType.Secondary,
  };
}

const setupShallow = setupShallowTest(SplitButtonComponent, getRequiredProps);
describe("SplitButton", () => {
  it("renders SplitButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders SplitButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(
      <SplitButtonComponent aria-label="Some Action" dropdown={{}} />,
    );
    const element = wrapper.find(CoreButton).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });
});
