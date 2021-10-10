import { mount, shallow } from "enzyme";
import { createRef } from "react";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreText } from "../../core-text";
import { Icon } from "../../icon";
import { SVGAsset } from "../../svg";
import { StatusAlertButton } from "../status-alert-button";
import {
  ButtonIcon,
  ButtonIconComponent,
  ButtonIconProps,
  ButtonIconSize,
  ButtonIconType,
} from "./component";

function getRequiredProps(): ButtonIconProps {
  return {
    "aria-label": "this is my aria label",
    icon: SVGAsset.Gear,
  };
}

function getOptionalProps(): ButtonIconProps {
  return {
    "aria-label": "this is my aria label",
    autoFocus: true,
    disabled: true,
    download: "Download all the things",
    dropdown: true,
    linkTo: "/",
    icon: SVGAsset.Gear,
    onClick: jest.fn(),
    overlay: true,
    size: ButtonIconSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "test title",
    variant: ButtonIconType.Secondary,
  };
}

const setupShallow = setupShallowTest(ButtonIconComponent, getRequiredProps);
describe("ButtonIcon", () => {
  it("renders button icon component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button icon component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a button icon with a JSX.Element as icon", () => {
    const wrapper = mount(
      <ButtonIcon
        aria-label="element test"
        icon={<CoreText>JSX Element</CoreText>}
      />,
    );
    expect(wrapper.find(CoreText).length).toBe(1);
  });

  it("renders a button icon with as a StatusAlertButton", () => {
    const wrapper = mount(
      <ButtonIcon
        aria-label="element test"
        icon={SVGAsset.Heart}
        statusAlertIcon={SVGAsset.Unheart}
      />,
    );
    expect(wrapper.find(StatusAlertButton).length).toBe(1);
  });

  it("renders a button icon with an SVGAsset passed as an icon", () => {
    const wrapper = mount(
      <ButtonIcon aria-label="gear test" icon={SVGAsset.Gear} />,
    );
    expect(wrapper.find(Icon).length).toBe(1);
    expect(wrapper.find(Icon).prop("asset")).toEqual(SVGAsset.Gear);
  });

  it("renders a large button icon component", () => {
    const { wrapper } = setupShallow({ size: ButtonIconSize.Large });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button icon component as <a>", () => {
    const { wrapper } = setupShallow({ linkTo: "https://www.google.com" });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button icon component <button> with an onclick", () => {
    const { wrapper } = setupShallow({ onClick: jest.fn() });
    expect(wrapper).toMatchSnapshot();
  });

  it("renders button icon component as Link component", () => {
    const { wrapper } = setupShallow({ linkTo: "/dashbaord" });
    expect(wrapper).toMatchSnapshot();
  });

  it("passes the aria props to the html", () => {
    const wrapper = shallow(
      <ButtonIcon role="button" {...getRequiredProps()} />,
    );
    const html = wrapper.html();
    expect(html.match(/aria-label="this is my aria label"/)?.length).toBe(1);
    expect(html.match(/role="button"/)?.length).toBe(1);
  });
  it("passes the data props to the html", () => {
    const wrapper = mount(
      <ButtonIcon data-test-selector="test-selector" {...getRequiredProps()} />,
    );

    expect(wrapper.find("button")).toHaveProp({
      "data-test-selector": "test-selector",
    });
  });

  it("passes the ref to the CoreButton case", () => {
    const testRef = createRef<HTMLElement>();
    mount(<ButtonIcon ref={testRef} {...getRequiredProps()} />);
    expect(testRef.current).not.toBe(null);
  });

  it("passes the ref to the CoreInteractive case", () => {
    const testRef = createRef<HTMLElement>();
    mount(<ButtonIcon ref={testRef} {...getRequiredProps()} dropdown />);
    expect(testRef.current).not.toBe(null);
  });

  it("passes through the type attribute to the HTML button element", () => {
    const wrapper = mount(<ButtonIcon {...getRequiredProps()} type="button" />);

    expect(wrapper.find("button").prop("type")).toEqual("button");
  });
});
