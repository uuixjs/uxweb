import { mount } from "enzyme";
import { Link, MemoryRouter } from "react-router-dom";
import { setupShallowTest } from "../../../tests/helpers";
import { CoreInteractive } from "../../core-interactive";
import {
  CoreButton,
  CoreButtonComponent,
  CoreButtonProps,
  CoreButtonRounding,
  CoreButtonSize,
  CoreButtonType,
} from "./component";

function getOptionalProps(): CoreButtonProps {
  return {
    autoFocus: true,
    children: "Test Button",
    disabled: true,
    disabledInteraction: true,
    download: "Download all the things",
    fullWidth: true,
    linkTo: "/",
    onClick: jest.fn(),
    overlay: true,
    rounding: CoreButtonRounding.Left,
    size: CoreButtonSize.Large,
    tabIndex: 0,
    targetBlank: true,
    title: "Test title",
    variant: CoreButtonType.Secondary,
  };
}

const setupShallow = setupShallowTest(CoreButtonComponent);
describe("CoreButton", () => {
  it("renders CoreButton component with required props", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders CoreButton component with all props", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders CoreButton component as <a>", () => {
    const testUrl = "http://www.google.com";
    const wrapper = mount(
      <MemoryRouter>
        <CoreButton linkTo={testUrl} />
      </MemoryRouter>,
    );
    expect(wrapper.find("a").first().prop("href")).toBe(testUrl);
  });

  it("renders CoreButton component as <button> with an onclick", () => {
    const testFn = jest.fn();
    const wrapper = mount(<CoreButton onClick={testFn} />);
    wrapper.find("button").first().simulate("click");
    expect(testFn).toHaveBeenCalled();
  });

  it("renders CoreButton component as Link component", () => {
    const testPath = "/dashboard";
    const wrapper = mount(
      <MemoryRouter>
        <CoreButton linkTo={testPath} />
      </MemoryRouter>,
    );
    expect(wrapper.find(Link).first().prop("to")).toBe(testPath);
  });

  it("passes aria props to the element", () => {
    const wrapper = mount(<CoreButton aria-label="Some Action" />);
    const element = wrapper.find(CoreInteractive).first();
    expect(element.prop("aria-label")).toBe("Some Action");
  });
});
