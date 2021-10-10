import { mount } from "enzyme";
import { TooltipWrapper } from "./index";

describe("TooltipWrapper", () => {
  it("renders children", () => {
    const wrapper = mount(
      <TooltipWrapper>
        <div data-test-selector="child-selector" />
      </TooltipWrapper>,
    );

    expect(wrapper.find({ "data-test-selector": "child-selector" })).toExist();
  });

  it("passes through other props to child", () => {
    const wrapper = mount(
      <TooltipWrapper data-foo-bar="my-data-test">
        <div />
      </TooltipWrapper>,
    );

    expect(
      wrapper.find({ "data-foo-bar": "my-data-test" }).hostNodes().length,
    ).toBe(1);
  });
});
