import { shallow } from "enzyme";
import { setupShallowTest } from "../../../tests/helpers";
import { SVGAsset } from "../../svg";
import { CoreButtonSize } from "../core-button";
import { SelectButtonComponent, SelectButtonProps } from "./component";

function getOptionalProps(): SelectButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    download: "Download all the things",
    fullWidth: true,
    icon: SVGAsset.Gear,
    linkTo: "/",
    onClick: jest.fn(),
    overlay: true,
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "Test title",
  };
}

const setupShallow = setupShallowTest(SelectButtonComponent);
describe("SelectButton", () => {
  it("renders SelectButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders SelectButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the element", () => {
    const wrapper = shallow(<SelectButtonComponent aria-label="Some Action" />);
    const element = wrapper.find("[aria-label]").first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });
});
