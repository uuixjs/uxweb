import { Button, ButtonProps, ButtonSize, ButtonType } from "./component";
import { mount, shallow } from "enzyme";

import { CoreButton } from "../core-button";
import { CoreInteractiveElement } from "../../core-interactive";
import { PurchaseButton } from "../purchase-button";
import { SVGAsset } from "../../svg";
import { createRef } from "react";
import { setupShallowTest } from "../../../tests/helpers";

function getOptionalProps(): ButtonProps {
  return {
    autoFocus: true,
    disabled: true,
    download: "Download all the things",
    dropdown: true,
    fullWidth: true,
    linkTo: "/",
    icon: SVGAsset.Gear,
    onClick: jest.fn(),
    overlay: true,
    size: ButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "test title",
    variant: ButtonType.Secondary,
  };
}

const setupShallow = setupShallowTest(Button);
describe("Button", () => {
  it("renders button component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button component as <a>", () => {
    const { wrapper } = setupShallow({ linkTo: "https://www.google.com" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button component as <button> with an onclick", () => {
    const { wrapper } = setupShallow({ onClick: jest.fn() });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button component as Link component", () => {
    const { wrapper } = setupShallow({ linkTo: "/dashbaord" });
    expect(wrapper).toMatchSnapshot();
  });

  it("passes aria props to the CoreButton", () => {
    const wrapper = shallow(<Button aria-atomic={true} />);
    const element = wrapper.find(CoreButton).first();
    expect(element.prop("aria-atomic")).toBe(true);
  });

  it("passes aria props to the CoreInteractive", () => {
    const wrapper = shallow(<Button aria-atomic={true} purchase="$" />);
    const element = wrapper.find(PurchaseButton).first();
    expect(element.prop("aria-atomic")).toBe(true);
  });

  it("passes the ref to the CoreButton case", () => {
    const testRef = createRef<CoreInteractiveElement>();
    mount(<Button ref={testRef} />);
    expect(testRef.current).not.toBe(null);
  });

  it("passes the ref to the CoreInteractive case", () => {
    const testRef = createRef<CoreInteractiveElement>();
    mount(<Button ref={testRef} statusAlertText="Test Text" />);
    expect(testRef.current).not.toBe(null);
  });

  it("passes through the type attribute to the HTML button element", () => {
    const wrapper = mount(<Button type="button">Hello World</Button>);

    expect(wrapper.find("button").prop("type")).toEqual("button");
  });
});
