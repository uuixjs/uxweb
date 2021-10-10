import { mount, ReactWrapper } from "enzyme";
import { Component } from "react";
import { act } from "react-dom/test-utils";
import ReactModal from "react-modal";
import { DialogLayer } from "./component";

const ESC_KEY_CODE = 27;

const requiredProps = {
  show: true,
  onRequestClose: null,
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

describe(DialogLayer, () => {
  const listeners: { [key: string]: (e: Partial<MouseEvent>) => void } = {};

  beforeEach(() => {
    jest.useFakeTimers();

    // Suppress warning messages in test env
    ReactModal.setAppElement(document.createElement("div"));

    document.addEventListener = jest.fn(
      (event: string, cb: (e: Partial<MouseEvent>) => void) => {
        listeners[event] = cb;
      },
    );
  });

  it("renders children when show is true", async () => {
    const selector = {
      "data-test-selector": "my-test-content",
    };
    const wrapper = mount(
      <DialogLayer {...requiredProps} show={false}>
        <div {...selector} />
      </DialogLayer>,
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
      <DialogLayer
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
      <DialogLayer {...requiredProps} onExitComplete={callback} />,
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
      <DialogLayer {...requiredProps} children={<div />} />,
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

  it("passes through aria props to the DOM", async () => {
    /**
     * This test _only_ asserts the attributes are present somewhere in the DOM,
     * but not that they have the correct impact to assist screen readers.
     *
     * Be sure to manually verify correct screen reader behavior!
     */
    const wrapper = mount(
      <DialogLayer
        {...requiredProps}
        show={false}
        role="menu"
        aria-label="my-label"
        aria-labelledby="#id-one"
        aria-describedby="#id-two"
      />,
    );

    await setProps(wrapper, { show: true });
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('[role="menu"]').hostNodes()).toExist();
    expect(wrapper.find('[aria-label="my-label"]').hostNodes()).toExist();
    expect(wrapper.find('[aria-labelledby="#id-one"]').hostNodes()).toExist();
    expect(wrapper.find('[aria-describedby="#id-two"]').hostNodes()).toExist();
  });

  it("escape key triggers onRequestClose", async () => {
    const selector = {
      "data-test-selector": "my-test-content",
    };

    const callback = jest.fn();
    const wrapper = mount(
      <DialogLayer
        {...requiredProps}
        onRequestClose={callback}
        children={<div {...selector} />}
      />,
    );

    await act(async () => {
      wrapper.find(selector).simulate("keydown", { keyCode: ESC_KEY_CODE });
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("onRequestClose is called when an outside div is the target", async () => {
    const callback = jest.fn();
    const anchorRef = document.createElement("div");
    const someDiv = document.createElement("div");
    someDiv.appendChild(anchorRef);

    mount(
      <DialogLayer
        {...requiredProps}
        anchorRef={anchorRef}
        onRequestClose={callback}
      />,
    );

    // Call the click out callback with an outside node as target
    await act(async () => {
      listeners.mousedown({ target: someDiv });
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("onRequestClose is not called when the anchor is the target", async () => {
    const callback = jest.fn();
    const anchorRef = document.createElement("div");
    const someDiv = document.createElement("div");
    someDiv.appendChild(anchorRef);

    mount(
      <DialogLayer
        {...requiredProps}
        anchorRef={anchorRef}
        onRequestClose={callback}
      />,
    );

    // Call the click out callback with anchorRef as target
    await act(async () => {
      listeners.mousedown({ target: anchorRef });
    });
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it("onRequestClose is not called when it is disabled via props", async () => {
    const callback = jest.fn();
    const someDiv = document.createElement("div");

    mount(
      <DialogLayer
        {...requiredProps}
        onRequestClose={callback}
        disableCloseOnClickOut
      />,
    );

    // Call the click out callback with an outside node as target
    await act(async () => {
      listeners.mousedown({ target: someDiv });
    });
    expect(callback).toHaveBeenCalledTimes(0);
  });

  describe("ariaHideApp", () => {
    it("is the default behavior", () => {
      const wrapper = mount(<DialogLayer {...requiredProps} />);
      expect(wrapper.find(ReactModal)).toHaveProp({ ariaHideApp: true });
    });

    it("can be disabled via disableAriaHideApp", () => {
      const wrapper = mount(
        <DialogLayer {...requiredProps} disableAriaHideApp />,
      );
      expect(wrapper.find(ReactModal)).toHaveProp({ ariaHideApp: false });
    });
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
