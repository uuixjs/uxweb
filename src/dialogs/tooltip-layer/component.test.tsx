import { mount, ReactWrapper } from "enzyme";
import { Component } from "react";
import { act } from "react-dom/test-utils";
import { TooltipLayer } from "./component";

const requiredProps = {
  show: true,
  anchorRef: {
    getBoundingClientRect: () => ({
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
    }),
  },
};

describe(TooltipLayer, () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it.only("renders children when show is true", async () => {
    const selector = {
      "data-test-selector": "my-test-content",
    };
    const wrapper = mount(
      <TooltipLayer {...requiredProps} show={false}>
        <div {...selector} />
      </TooltipLayer>,
    );

    // No children when not visible
    expect(wrapper.find(selector)).not.toExist();

    // Has children when visible
    await setProps(wrapper, { show: true });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find(selector)).toExist();
  });

  it("calls onEnterComplete when mounting", async () => {
    const callback = jest.fn();
    const wrapper = mount(
      <TooltipLayer
        {...requiredProps}
        show={false}
        onEnterComplete={callback}
      />,
    );

    // Enter transition starts but does not fire callback yet:
    await setProps(wrapper, { show: true });
    expect(callback).toHaveBeenCalledTimes(0);

    // Enter transition completes:
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("calls onExitComplete when unmounting", async () => {
    const callback = jest.fn();
    const wrapper = mount(
      <TooltipLayer {...requiredProps} onExitComplete={callback} />,
    );

    // Exit transition starts but does not hide children yet:
    await setProps(wrapper, { show: false });
    expect(callback).toHaveBeenCalledTimes(0);

    // Exit transition completes:
    await act(async () => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("unmounts all children after exit transition completes", async () => {
    const wrapper = mount(
      <TooltipLayer {...requiredProps} children={<div />} />,
    );

    // Visible
    expect(wrapper.children().length).toBe(1);

    // Exit transitions starts
    await setProps(wrapper, { show: false });
    expect(wrapper.children().length).toBe(1);

    // Transition completes
    await act(async () => {
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.children().length).toBe(0);
  });
});

async function setProps<C extends Component, P = C["props"], S = C["state"]>(
  wrapper: ReactWrapper<P, S, C>,
  props: Pick<P, keyof P>,
) {
  return act(async () => {
    wrapper.setProps(props);
    wrapper.update();
  });
}
