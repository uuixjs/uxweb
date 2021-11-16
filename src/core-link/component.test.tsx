import { shallow } from "enzyme";
import { setupShallowTest } from "../../tests/helpers";
import { CoreLink, CoreLinkProps, CoreLinkType } from "./component";

function getOptionalProps(): CoreLinkProps {
  return {
    className: "test-classname",
    variant: CoreLinkType.Overlay,
    onClick: jest.fn(),
    linkTo: "/",
    hoverUnderlineNone: true,
    targetBlank: true,
    disabled: true,
    title: "test",
  };
}

const setupShallow = setupShallowTest(CoreLink);
describe("CoreLink", () => {
  it("renders core link component with required props as <button>", () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders core link component with all props as <a>", () => {
    const { wrapper } = setupShallow(getOptionalProps());
    expect(wrapper).toMatchSnapshot();
  });

  it("renders :disabled when disabled is true", () => {
    const wrapper = shallow(<CoreLink disabled>Test</CoreLink>);
    expect(wrapper.prop("disabled")).toBe(true);
  });

  it("accepts additional class names", () => {
    const testClassName = "test-classname";
    const wrapper = shallow(
      <CoreLink className={testClassName}>Test</CoreLink>,
    );
    expect(wrapper.prop("className")).toContain("tw-link");
    expect(wrapper.prop("className")).toContain(testClassName);
  });
});
